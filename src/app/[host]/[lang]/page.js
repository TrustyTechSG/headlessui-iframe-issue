import Link from "next/link";

export default function Home({ params }) {
  return (
    <main>
      <div>
        <p>
          Host:&nbsp;
          <code>{params.host}</code>
          &nbsp;&nbsp; Lang:&nbsp;
          <code>{params.lang}</code>
        </p>
        <div>
          <Link href="/subpage">Subpage</Link>
        </div>
      </div>
    </main>
  );
}
