import { Text } from "@/components/ui/Text";
import { Metadata } from "next";

interface DetailsPageProps {
  params: {
    id: string;
  };
}
export default function DetailsPage({ params }: DetailsPageProps) {
  const { id } = params;

  return (
    <div className="flex bg-background-black">
      <Text variant="h2" className="text-content-primary">
        TO DO
      </Text>
    </div>
  );
}
