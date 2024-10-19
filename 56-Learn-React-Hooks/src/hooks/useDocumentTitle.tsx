import * as React from "react";

export default function useDocumentTitle(title: string) {
  React.useEffect(() => {
    document.title = title;
  }),
    [title];
}
