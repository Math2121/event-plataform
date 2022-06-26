import { format } from "date-fns";
import { isPast } from "date-fns/esm";
import ptBR from "date-fns/locale/pt-BR";
import { CheckCircle, Lock } from "phosphor-react";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";
interface ILessonProps {
  title: string;
  slugLesson: string;
  available_at: Date;
  type: "live" | "class";
}
function Lesson({ available_at, slugLesson, title, type }: ILessonProps) {
  const { slug } = useParams<{ slug: string }>();
  const isLessonAvailable = isPast(available_at);
  const isActiveLesson = slug === slugLesson;
  const availableDateFormat = format(
    available_at,
    "EEEE' • ' d' de 'MMMM'  • 'k'h'mm",
    { locale: ptBR }
  );
  return (
    <Link to={`/event/lesson/${slugLesson}`} className="group">
      <span className="text-gray-300">{availableDateFormat}</span>` $
      {isActiveLesson ? "bg-green-500" : ""}`
      <div
        className={classNames(
          "rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500",
          {
            "bg-green-500": isActiveLesson,
          }
        )}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={classNames(
                "text-sm  font-medium flex items-center gap-2",
                {
                  "text-blue-500": !isActiveLesson,
                  "text-white": isActiveLesson,
                }
              )}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span
            className={classNames(
              "text-xs rounded py-[2px] px-2 text-white border font-bold",
              {
                "border-white": isActiveLesson,
                "border-green-300": !isActiveLesson,
              }
            )}
          >
            {type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>

        <strong
          className={classNames(" mt-5 block", {
            "text-white": isActiveLesson,
            "text-gray-200": !isActiveLesson,
          })}
        >
          {title}
        </strong>
      </div>
    </Link>
  );
}

export default Lesson;
