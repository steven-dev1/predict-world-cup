// Team to ISO country code mapping for flag images
// Uses flagcdn.com for real flag images
const teamToCountry: Record<string, string> = {
  Mexico: "mx",
  "South Africa": "za",
  "South Korea": "kr",
  Czechia: "cz",
  Qatar: "qa",
  Switzerland: "ch",
  Brazil: "br",
  Morocco: "ma",
  USA: "us",
  Paraguay: "py",
  Germany: "de",
  Curacao: "cw",
  Netherlands: "nl",
  Japan: "jp",
  "Ivory Coast": "ci",
  Ecuador: "ec",
  Haiti: "ht",
  Scotland: "gb-sct",
  Spain: "es",
  "Cape Verde": "cv",
  Belgium: "be",
  Egypt: "eg",
  "Saudi Arabia": "sa",
  Uruguay: "uy",
  France: "fr",
  Senegal: "sn",
  Iran: "ir",
  "New Zealand": "nz",
  Austria: "at",
  Jordan: "jo",
  England: "gb-eng",
  Croatia: "hr",
  Ghana: "gh",
  Panama: "pa",
  Argentina: "ar",
  Algeria: "dz",
  Uzbekistan: "uz",
  Colombia: "co",
  Portugal: "pt",
  Norway: "no",
  Australia: "au",
  Turkiye: "tr",
  Sweden: "se",
  Tunisia: "tn",
  Iraq: "iq",
  Peru: "pe",
  "DR Congo": "cd",
  Poland: "pl",
  Serbia: "rs",
  Cameroon: "cm",
  "Costa Rica": "cr",
  Canada: "ca",
  "Bosnia Herzegovina": "ba",
};

export function getCountryCode(teamName: string): string {
  return teamToCountry[teamName] ?? "un"; // fallback to UN flag
}

export function getFlagUrl(teamName: string): string {
  const code = getCountryCode(teamName);
  return `https://flagcdn.com/w40/${code}.png`;
}

export function FlagImg({
  teamName,
  className = "",
}: {
  teamName: string;
  className?: string;
}) {
  const code = getCountryCode(teamName);
  const url = `https://flagcdn.com/w40/${code}.png`;

  return (
    <img
      src={url}
      alt={teamName}
      loading="lazy"
      className={`inline-block object-cover rounded-sm ${className}`}
      onError={(e) => {
        // Fallback: show first 2 letters if flag fails to load
        const target = e.target as HTMLImageElement;
        target.style.display = "none";
        const span = target.nextElementSibling as HTMLSpanElement;
        if (span) span.style.display = "flex";
      }}
    />
  );
}

export function Flag({
  teamName,
  className = "h-6 w-8",
}: {
  teamName: string;
  className?: string;
}) {
  const code = getCountryCode(teamName);

  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      <img
        src={`https://flagcdn.com/w40/${code}.png`}
        alt={teamName}
        loading="lazy"
        className="h-full w-full object-cover rounded-sm"
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          img.style.display = "none";
          const fallback = img.parentElement?.querySelector(".flag-fallback");
          if (fallback) (fallback as HTMLElement).style.display = "flex";
        }}
      />
      <span
        className="flag-fallback hidden items-center justify-center rounded bg-slate-700 text-[9px] font-bold text-slate-300 h-full w-full absolute inset-0"
      >
        {code.slice(0, 2).toUpperCase()}
      </span>
    </span>
  );
}
