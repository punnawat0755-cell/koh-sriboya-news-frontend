export function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, string> = {
    home: "M3 10 12 3l9 7v11h-6v-7H9v7H3Z",
    search: "M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
    grid: "M3 3h7v7H3ZM14 3h7v7h-7ZM3 14h7v7H3ZM14 14h7v7h-7Z",
    news: "M4 3h16v18H4ZM8 7h8M8 11h8M8 15h4",
    folder: "M3 6h7l2 2h9v13H3ZM3 6V3h7l2 3",
    image: "M3 3h18v18H3ZM3 17l6-6 4 4 3-3 5 5M8 7h.01",
    users:
      "M16 21v-3a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v3M13 4a4 4 0 0 1 0 8M22 21v-3a4 4 0 0 0-3-4M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
    eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7ZM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
    edit: "m16 3 5 5-12 12-6 1 1-6ZM13 6l5 5",
    bell: "M18 8a6 6 0 0 0-12 0c0 8-3 8-3 10h18c0-2-3-2-3-10M10 21h4",
    plus: "M12 4v16M4 12h16",
    arrow: "M4 12h16M14 6l6 6-6 6",
    help: "M9 9a3 3 0 1 1 5 2c-2 1-2 2-2 3M12 17h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
    mail: "M3 5h18v14H3ZM3 5l9 8 9-8",
    menu: "M3 6h18M3 12h18M3 18h18",
    close: "m5 5 14 14M19 5 5 19",
    chart: "M3 3v18h18M7 16l4-5 4 2 6-8",
    clock: "M12 6v6l4 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.news} />
    </svg>
  );
}
