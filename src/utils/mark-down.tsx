type Props = {
  text: string;
};

export default function Markdown({ text }: Props) {
  const lines = text.split("\n");

  return (
    <div>
      {lines.map((line, i) => {
        // HEADINGS ##
        if (line.startsWith("## ")) {
          return (
            <h2 key={i} style={{ fontWeight: "bold", fontSize: "20px", marginTop: "16px" }}>
              {line.replace("## ", "")}
            </h2>
          );
        }

        // EMPTY LINE
        if (line.trim() === "") {
          return <div key={i} style={{ height: "10px" }} />;
        }

        // BOLD **text**
        const parts = line.split(/(\*\*.*?\*\*)/g);

        return (
          <p key={i} style={{ margin: "8px 0" }}>
            {parts.map((part, j) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <b key={j}>
                    {part.replace(/\*\*/g, "")}
                  </b>
                );
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
}