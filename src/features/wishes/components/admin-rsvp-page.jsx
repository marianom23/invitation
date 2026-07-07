import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { fetchWishes } from "@/services/api";
import { getWeddingUid } from "@/lib/invitation-storage";

const ATTENDANCE_LABELS = {
  ATTENDING: "Asistirá",
  NOT_ATTENDING: "No asiste",
  MAYBE: "Tal vez",
};

function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * RSVP dashboard for a single invitation.
 * Visit /admin?uid=<wedding-uid> to view responses for that invitation.
 * Falls back to the last invitation UID stored in this browser, if any.
 */
export default function AdminRsvpPage() {
  const invitationUid =
    new URLSearchParams(window.location.search).get("uid") || getWeddingUid();

  const {
    data: wishes = [],
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["admin-wishes", invitationUid],
    queryFn: async () => {
      const response = await fetchWishes(invitationUid, { limit: 100 });
      if (!response.success) {
        throw new Error(response.error || "No se pudieron cargar los RSVP");
      }
      return response.data;
    },
    enabled: !!invitationUid,
    staleTime: 15 * 1000,
  });

  const totals = useMemo(
    () =>
      wishes.reduce(
        (summary, wish) => {
          const guestCount = Number(wish.guest_count) || 1;
          summary.responses += 1;
          summary.guests += guestCount;

          if (wish.attendance === "ATTENDING") {
            summary.attendingResponses += 1;
            summary.attendingGuests += guestCount;
          }

          if (wish.attendance === "NOT_ATTENDING") {
            summary.notAttendingResponses += 1;
          }

          if (wish.attendance === "MAYBE") {
            summary.maybeResponses += 1;
          }

          return summary;
        },
        {
          responses: 0,
          guests: 0,
          attendingResponses: 0,
          attendingGuests: 0,
          notAttendingResponses: 0,
          maybeResponses: 0,
        },
      ),
    [wishes],
  );

  if (!invitationUid) {
    return (
      <main className="min-h-screen bg-white px-4 py-6 text-gray-900">
        <div className="mx-auto max-w-xl space-y-2 pt-20 text-center">
          <h1 className="text-2xl font-semibold">Estado de invitados</h1>
          <p className="text-sm text-gray-500">
            Agregá <code>?uid=&lt;wedding-uid&gt;</code> a la URL para ver los
            RSVP de esa invitación (ej: <code>/admin?uid=rifqi-dina-2025</code>
            ).
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-6 text-gray-900">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Estado de invitados</h1>
            <p className="text-sm text-gray-500">{invitationUid}</p>
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            className="inline-flex items-center justify-center gap-2 rounded border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50"
          >
            <RefreshCw
              className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Actualizar
          </button>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="border p-3">
            <p className="text-xs uppercase text-gray-500">Respuestas</p>
            <p className="text-2xl font-semibold">{totals.responses}</p>
          </div>
          <div className="border p-3">
            <p className="text-xs uppercase text-gray-500">Personas</p>
            <p className="text-2xl font-semibold">{totals.guests}</p>
          </div>
          <div className="border p-3">
            <p className="text-xs uppercase text-gray-500">Asisten</p>
            <p className="text-2xl font-semibold">{totals.attendingGuests}</p>
            <p className="text-xs text-gray-500">
              {totals.attendingResponses} respuestas
            </p>
          </div>
          <div className="border p-3">
            <p className="text-xs uppercase text-gray-500">No asisten</p>
            <p className="text-2xl font-semibold">
              {totals.notAttendingResponses}
            </p>
          </div>
          <div className="border p-3">
            <p className="text-xs uppercase text-gray-500">Tal vez</p>
            <p className="text-2xl font-semibold">{totals.maybeResponses}</p>
          </div>
        </section>

        {error && (
          <p className="border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error.message}
          </p>
        )}

        {isLoading ? (
          <p className="py-8 text-center text-gray-500">Cargando...</p>
        ) : (
          <div className="overflow-x-auto border">
            <table className="w-full min-w-[820px] border-collapse text-left text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b p-3">Nombre</th>
                  <th className="border-b p-3">Asistencia</th>
                  <th className="border-b p-3">Personas</th>
                  <th className="border-b p-3">Mensaje</th>
                  <th className="border-b p-3">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {wishes.length === 0 ? (
                  <tr>
                    <td className="p-4 text-center text-gray-500" colSpan="5">
                      Todavía no hay respuestas.
                    </td>
                  </tr>
                ) : (
                  wishes.map((wish) => (
                    <tr
                      key={wish.id}
                      className="align-top odd:bg-white even:bg-gray-50"
                    >
                      <td className="border-b p-3 font-medium">{wish.name}</td>
                      <td className="border-b p-3">
                        {ATTENDANCE_LABELS[wish.attendance] || wish.attendance}
                      </td>
                      <td className="border-b p-3">{wish.guest_count || 1}</td>
                      <td className="max-w-md border-b p-3">{wish.message}</td>
                      <td className="border-b p-3 text-gray-600">
                        {formatDate(wish.created_at)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
