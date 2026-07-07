import { useInvitation } from "@/features/invitation/invitation-context";
import staticConfig from "@/config/config";

/**
 * Custom hook to access wedding configuration
 * Returns config from API if available, otherwise falls back to static config
 *
 * @returns {object} Wedding configuration data
 *
 * @example
 * const config = useConfig();
 * console.log(config.groomName, config.brideName);
 */
export function useConfig() {
  const { config } = useInvitation();

  if (!config) {
    return staticConfig.data;
  }

  // API dates arrive as full ISO strings ("2026-12-06T00:00:00.000Z", UTC
  // midnight). Keep only YYYY-MM-DD so components that append a local time
  // (e.g. hero's countdown) don't shift to the previous day in UTC-3.
  const normalizedDate =
    typeof config.date === "string" && config.date.includes("T")
      ? config.date.slice(0, 10)
      : config.date || staticConfig.data.date;

  // The API only stores part of the config (names, dates, agenda, banks).
  // Merge it over the static config so purely-frontend data (venues,
  // galleries, story, dress code, playlist) is always available.
  return {
    ...staticConfig.data,
    ...config,
    date: normalizedDate,
    venues: config.venues || staticConfig.data.venues,
    venuePhotos: config.venuePhotos || staticConfig.data.venuePhotos,
    couplePhotos: config.couplePhotos || staticConfig.data.couplePhotos,
    story: config.story || staticConfig.data.story,
    dressCode: config.dressCode || staticConfig.data.dressCode,
    spotify: config.spotify || staticConfig.data.spotify,
    agenda: config.agenda?.length ? config.agenda : staticConfig.data.agenda,
    banks: config.banks?.length ? config.banks : staticConfig.data.banks,
    audio: {
      ...staticConfig.data.audio,
      ...config.audio,
    },
  };
}
