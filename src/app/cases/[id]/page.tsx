import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CLINICAL_CASES } from "@/data/clinicalCasesData";
import CaseStudyViewer from "@/components/cases/CaseStudyViewer";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return CLINICAL_CASES.map((c) => ({
    id: c.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const clinicalCase = CLINICAL_CASES.find((c) => c.id === id);

  if (!clinicalCase) {
    return {
      title: "症例が見つかりません",
      description: "指定された症例演習データは存在しないか、移動した可能性があります。",
    };
  }

  const title = `症例${clinicalCase.caseNumber}: ${clinicalCase.title}｜臨床症例演習`;
  const description = `${clinicalCase.patient.chiefComplaint}。${clinicalCase.subTitle}。四診合参から弁証・治法・処方配穴を導く臨床演習。`;

  return {
    title,
    description,
    alternates: {
      canonical: `/cases/${clinicalCase.id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.haritaro.jp/cases/${clinicalCase.id}`,
      type: "article",
    },
  };
}

export default async function CaseDetailPage({ params }: Props) {
  const { id } = await params;
  const clinicalCase = CLINICAL_CASES.find((c) => c.id === id);

  if (!clinicalCase) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <CaseStudyViewer clinicalCase={clinicalCase} />
    </div>
  );
}
