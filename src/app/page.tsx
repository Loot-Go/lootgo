import AppleMaps from "@/components/app/apple-maps";
import { getMapsToken } from "@/lib/globalActions";

export default async function Home() {
  const appleMapsToken = await getMapsToken();

  return (
    <div className="relative -mb-16 flex flex-1">
      <div className="absolute inset-0">
        <AppleMaps
          token={appleMapsToken}
          className="h-full w-full flex-1 bg-gray-300"
          coordinatesArray={[{ lat: 0, lng: 0, type: "box1" }]}
          paddingBottom={70}
          enableUserLocation
        />
      </div>
    </div>
  );
}
