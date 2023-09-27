"use client";

import Frame from "react-frame-component";
import ModalComponent from "./ModalComponent";

export default function Page() {
  return (
    <div className="h-screen w-screen bg-blue-50 p-16">
      <Frame
        className="h-96 w-60 bg-green-200 ring-2 ring-gray-500"
        initialContent={`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
</head>
<body class="p-6">
<div></div>
</body>
</html>`}
      >
        <h1 className="mb-4">Im a iframe</h1>
        <ModalComponent />
      </Frame>
    </div>
  );
}
