export default function ContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full p-6 h-full bg-color-content rounded-xl">
      {children}
    </div>
  );
}
