import { JambCenter } from "@/types/center";

export function parseRawData(str: string): JambCenter[] {
  const lines = str.trim().split("\n");
  const parsed: JambCenter[] = [];

  const decodeEntities = (text: string) => {
    return text.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
  };

  const sanitizeText = (text: string) => {
    return decodeEntities(text)
      .replace(/(\r\n|\n|\r)/gm, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  lines.forEach((line) => {
    line = line.trim();
    if (!line || line.includes("JAMB | CMS")) return;

    const parts = line.split(/\t/);

    if (parts.length < 2) {
      const partsSpace = line.split(/\s{2,}/);
      if (partsSpace.length > parts.length) {
        parts.length = 0;
        parts.push(...partsSpace);
      }
    }

    if (parts.length < 4) return;

    const sn = parseInt(parts[0]);
    if (isNaN(sn)) return;

    const state = sanitizeText(parts[1]);
    const town = sanitizeText(parts[2]);

    let lat: number | null = null;
    let lng: number | null = null;
    let rawDescription = "";

    const last = parseFloat(parts[parts.length - 1]);
    const secondLast = parseFloat(parts[parts.length - 2]);

    if (!isNaN(last) && !isNaN(secondLast)) {
      lat = secondLast;
      lng = last;
      rawDescription = parts.slice(3, parts.length - 2).join(" ");
    } else {
      rawDescription = parts.slice(3).join(" ");
    }

    // Clean description and extract name/address
    let fullText = sanitizeText(rawDescription);
    if (fullText.startsWith('"') && fullText.endsWith('"')) {
      fullText = fullText.slice(1, -1).trim();
    }

    // Heuristic: Many lines are "NAME, ADDRESS, CITY, STATE, Nigeria"
    // The "Full Info" column often has the center name repeated.
    // We'll try to split by the first comma for name/address if it seems logical.
    const commaIndex = fullText.indexOf(",");
    let centre_name = fullText;
    let address = fullText;

    if (commaIndex > 0) {
      centre_name = fullText.substring(0, commaIndex).trim();
      address = fullText.substring(commaIndex + 1).trim();

      // If the address starts with the name, remove it
      if (address.toLowerCase().startsWith(centre_name.toLowerCase())) {
        address = address.substring(centre_name.length).replace(/^[\s,]+/, "").trim();
      }
    }

    parsed.push({
      sn: sn,
      state: state,
      town: town,
      centre_name: centre_name,
      address: address,
      lat: lat,
      lng: lng,
    });
  });

  return parsed.sort((a, b) => a.state.localeCompare(b.state));
}
