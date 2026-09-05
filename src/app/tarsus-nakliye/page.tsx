import { LocationLanding, locationMetadata } from "@/components/sections/LocationLanding";
import { locationBySlug } from "@/config/locations";

const location = locationBySlug("tarsus-nakliye")!;

export const metadata = locationMetadata(location.slug);

export default function Page() {
  return <LocationLanding location={location} />;
}
