import { Activity, Ear, Eye, Flower2, Leaf, PersonStanding, Wind, type LucideIcon } from 'lucide-react';
import { ClinicalComplaintIcon } from '@/components/clinical/ClinicalArtwork';

/** A visual cue for the topic; the neighbouring heading provides its label. */
export default function SymptomIcon({ id, className = 'h-12 w-12' }: { id: string; className?: string }) {
  const clinicalKinds: Record<string, string> = {
    'headache-stiff-neck': 'headache',
    'stress-insomnia': 'sleep',
    'stomach-fatigue': 'digestion',
    'chronic-fatigue-lethargy': 'fatigue',
    'lower-back-pain-sciatica': 'back',
    'constipation-ibs': 'digestion',
  };
  if (clinicalKinds[id]) return <span className="contents [--clinical-art-gold:var(--amber-warm)] [--clinical-art-muted:var(--accent-readable)]"><ClinicalComplaintIcon kind={clinicalKinds[id]} className={className} /></span>;
  const icons: Record<string, LucideIcon> = {
    'menstrual-pain-chill': Flower2,
    'eye-strain-fatigue': Eye,
    'dizziness-tinnitus': Ear,
    'climacteric-hot-flash': Leaf,
    'allergic-rhinitis-hayfever': Wind,
    'knee-joint-pain': PersonStanding,
  };
  const Icon = icons[id] ?? Activity;
  return <Icon className={className} strokeWidth={1.4} aria-hidden="true" />;
}
