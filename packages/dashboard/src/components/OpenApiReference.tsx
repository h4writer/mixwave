import { ApiReferenceReact } from "@scalar/api-reference-react";
import { tsr } from "@/tsr";
import { useEffect } from "react";
import "@scalar/api-reference-react/style.css";

type OpenApiReferenceProps = {
  url: string;
  onLoad(): void;
};

export function OpenApiReference({ url, onLoad }: OpenApiReferenceProps) {
  const { data } = tsr.getSpec.useQuery({
    queryKey: ["spec"],
  });

  useEffect(() => {
    if (data) {
      onLoad();
    }
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <ApiReferenceReact
      configuration={{
        hideDownloadButton: true,
        withDefaultFonts: false,
        spec: {
          content: data.body,
        },
        servers: [
          {
            description: "Main",
            url: `${url}`,
          },
        ],
      }}
    />
  );
}
