import { CheckCircle2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getFormationBySlug } from "../constants/formations";

export default function FormationThankYouPage() {
  const { slug } = useParams();
  const formation = getFormationBySlug(slug);

  const nextLink = formation?.thankYouLink?.url || "/";
  const nextLabel = formation?.thankYouLink?.label || "الانتقال إلى الرابط الجديد";

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center px-4">
      <section className="w-full max-w-2xl rounded-2xl border border-[#FABC05]/30 bg-white/95 dark:bg-neutral-900/95 shadow-2xl p-8 md:p-10 text-center" dir="rtl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FABC05]/15">
          <CheckCircle2 className="h-10 w-10 text-[#FABC05]" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
          شكرا لك
        </h1>
        <p className="mt-3 text-lg text-neutral-700 dark:text-neutral-300">
          تم استلام تسجيلك بنجاح في {formation?.title}.
        </p>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          سيقوم فريقنا بالتواصل معك في اقرب وقت.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={nextLink}
            target={nextLink.startsWith("http") ? "_blank" : "_self"}
            rel={nextLink.startsWith("http") ? "noopener noreferrer" : undefined}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#FABC05] to-[#FFD700] px-6 py-3 font-semibold text-black transition hover:shadow-lg hover:shadow-[#FABC05]/40"
          >
            {nextLabel}
          </a>

          <Link
            to={formation?.route || "/formations"}
            className="inline-flex items-center justify-center rounded-xl border border-neutral-300 dark:border-neutral-600 px-6 py-3 font-semibold text-neutral-800 dark:text-neutral-200 transition hover:border-[#FABC05] hover:text-[#FABC05]"
          >
            العودة إلى صفحة الدورة
          </Link>
        </div>
      </section>
    </main>
  );
}
