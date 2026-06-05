import { SITE_VERSION } from "../lib/version";

type VersionLineProps = {
  className?: string;
};

export function VersionLine({ className = "text-[var(--tpl-muted)]" }: VersionLineProps) {
  return (
    <p className={`text-xs font-medium tracking-wide ${className}`.trim()}>
      {SITE_VERSION}
    </p>
  );
}
