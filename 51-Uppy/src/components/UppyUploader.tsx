import * as React from "react";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import XHR from "@uppy/xhr-upload";
import { v7 as uuidv7 } from "uuid";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

const UppyUploader = () => {
  const [uppy] = React.useState(() => {
    return new Uppy()
      .use(XHR, {
        endpoint: "http://localhost:4040/upload",
      })
      .on("file-added", async (file) => {
        console.log(file);
        uppy.setFileMeta(file.id, {
          extension: file.extension,
          uuid: uuidv7(),
        });
      });
  });

  return <Dashboard uppy={uppy} />;
};

export default UppyUploader;
