import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ padding: "96px 24px", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: 12 }}>Page not found</h1>
      <p style={{ marginBottom: 24, color: "#6b6b6b" }}>
        The page you are looking for does not exist.
      </p>
      <Link href="/" style={{ textDecoration: "underline" }}>
        Back to home
      </Link>
    </main>
  );
}
