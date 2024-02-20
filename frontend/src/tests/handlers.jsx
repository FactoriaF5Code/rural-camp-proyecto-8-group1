import { http, HttpResponse } from "msw";

export const handlers = [
  // capture "GET /greeting" requests
  http.get("http://localhost:8080/books?query=harry", () => {
    // respond using a mocked JSON body
   /*  return HttpResponse.json({
      results: [
        { title: "Harry Potter y la Piedra Filosofal" },
        { title: "Harry Potter y el Prisionero de Azkaban" },
        { title: "Harry Potter y la Cámara de los Secretos" },
      ],
    });
  }),
];
 */

return HttpResponse.json([
  { title: "Harry Potter y la Piedra Filosofal" },
  { title: "Harry Potter y el Prisionero de Azkaban" },
  { title: "Harry Potter y la Cámara de los Secretos" },
]);
}),
];