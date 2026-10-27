-- Nullable distinguishes legacy/unknown values from an intentional empty list.
ALTER TABLE public.patient_notes
  ADD COLUMN IF NOT EXISTS self_care_points TEXT[];

COMMENT ON COLUMN public.patient_notes.self_care_points IS
  'Self-care points for the printed care sheet. NULL is unknown/legacy; an empty array explicitly clears the list.';

-- Older tabs and mixed bulk upserts can omit this column or send NULL.
-- Preserve an existing list in that case; a non-NULL list, including [], replaces it.
CREATE OR REPLACE FUNCTION public.preserve_patient_note_self_care_points()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
  IF NEW.self_care_points IS NULL THEN
    NEW.self_care_points := OLD.self_care_points;
  END IF;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.preserve_patient_note_self_care_points() FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE TRIGGER preserve_patient_note_self_care_points
BEFORE UPDATE ON public.patient_notes
FOR EACH ROW
EXECUTE FUNCTION public.preserve_patient_note_self_care_points();
