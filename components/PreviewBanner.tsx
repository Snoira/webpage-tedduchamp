// import { siteUrl } from "@/env";

export default function PreviewBanner() {
  return (
    <div className="w-full bg-red-600 text-white text-sm py-2 px-4 flex justify-between items-center fixed top-0 left-0 right-0 z-101 bg-purple-700">
      <span>Preview mode enabled</span>
      <a
        href={`/api/draft-mode/disable?redirect=/`}
        className="underline font-medium"
      >
        Exit preview
      </a>
    </div>
  );
}