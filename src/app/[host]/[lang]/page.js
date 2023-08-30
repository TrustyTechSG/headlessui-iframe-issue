import Link from "next/link";
import styles from "../../page.module.css";

export default function Home({ params }) {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Host:&nbsp;
          <code className={styles.code}>{params.host}</code>
          &nbsp;&nbsp; Lang:&nbsp;
          <code className={styles.code}>{params.lang}</code>
        </p>
        <div>
          <Link href="/subpage">Subpage</Link>
        </div>
      </div>
    </main>
  );
}
