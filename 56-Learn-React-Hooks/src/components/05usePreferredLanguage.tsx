import * as React from "react";


import usePreferredLanguage from "../hooks/usePreferredLanguage";

export default function App() {
  const language = usePreferredLanguage();
  console.log(language)

  return (
    <section>
      <h1>usePreferredLanguage</h1>
      <p>
        You can change your preferred language here -
        chrome://settings/languages
      </p>
      <h2>
        The correct date format for <pre>{language}</pre> is{" "}
        <time>{new Date(Date.now()).toLocaleDateString(language)}</time>
      </h2>
    </section>
  );
}
