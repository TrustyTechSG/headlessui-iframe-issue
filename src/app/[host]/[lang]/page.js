import Link from "next/link";

export default function Home({ params }) {
  return (
    <Link
      className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
      href={`/${params.lang}/subpage`}
      rel="noopener noreferrer"
    >
      Subpage
    </Link>
  );
}
