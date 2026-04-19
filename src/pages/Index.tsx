import { LiquidMetalBackground } from "@/components/LiquidMetalBackground"
import { ShinyButton } from "@/components/ui/shiny-button"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import Icon from "@/components/ui/icon"

const TOTAL_SLIDES = 11

const slides = [
  { id: "slide-0", label: "Титул" },
  { id: "slide-1", label: "Биография" },
  { id: "slide-2", label: "Происхождение" },
  { id: "slide-3", label: "Служба" },
  { id: "slide-4", label: "Экспедиция" },
  { id: "slide-5", label: "Путь" },
  { id: "slide-6", label: "Открытие" },
  { id: "slide-7", label: "Байкал" },
  { id: "slide-8", label: "Карта" },
  { id: "slide-9", label: "Наследие" },
  { id: "slide-10", label: "Авторы" },
]

export default function Index() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY
      const containerWidth = scrollContainer.offsetWidth
      const currentScroll = scrollContainer.scrollLeft
      const current = Math.round(currentScroll / containerWidth)

      if (Math.abs(delta) > 10) {
        let target = current
        if (delta > 0) target = Math.min(current + 1, TOTAL_SLIDES - 1)
        else target = Math.max(current - 1, 0)
        scrollContainer.scrollTo({ left: target * containerWidth, behavior: "smooth" })
      }
    }

    const handleScroll = () => {
      const containerWidth = scrollContainer.offsetWidth
      const current = Math.round(scrollContainer.scrollLeft / containerWidth)
      setCurrentSlide(current)
    }

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false })
    scrollContainer.addEventListener("scroll", handleScroll)
    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel)
      scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const goTo = (index: number) => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return
    scrollContainer.scrollTo({ left: index * scrollContainer.offsetWidth, behavior: "smooth" })
  }

  return (
    <main className="relative h-screen overflow-hidden">
      <LiquidMetalBackground />
      <div className="fixed inset-0 z-[5] bg-black/60" />

      {/* Navbar */}
      <nav className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
        <div className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-sm flex items-center justify-between">
          <button onClick={() => goTo(0)} className="flex items-center gap-2 text-white">
            <Icon name="Waves" size={20} />
            <span className="font-semibold font-open-sans-custom tracking-tight">Курбат Иванов</span>
          </button>
          <div className="hidden md:flex items-center gap-6">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                className={cn(
                  "text-xs font-open-sans-custom transition-colors",
                  currentSlide === i ? "text-white" : "text-gray-400 hover:text-white"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="text-gray-400 text-sm font-open-sans-custom">
            {currentSlide + 1} / {TOTAL_SLIDES}
          </div>
        </div>
      </nav>

      {/* Dot navigation */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              "rounded-full transition-all duration-300",
              currentSlide === i ? "w-2 h-6 bg-white" : "w-2 h-2 bg-white/30 hover:bg-white/60"
            )}
          />
        ))}
      </div>

      {/* Slides */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 flex h-screen w-full overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >

        {/* Слайд 1 — Титульный */}
        <section className="flex min-w-full snap-start items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs text-gray-300 font-open-sans-custom backdrop-blur-sm">
              Исторический проект · 2026
            </div>
            <h1 className="mb-6 text-balance text-6xl tracking-tight text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] md:text-7xl lg:text-9xl">
              <span className="font-open-sans-custom">Курбат</span>{" "}
              <span className="font-serif italic">Иванов</span>
            </h1>
            <p className="mb-3 text-2xl text-white/70 font-open-sans-custom font-light tracking-widest uppercase">
              Первооткрыватель Байкала
            </p>
            <p className="mb-10 mx-auto max-w-xl text-gray-300 font-open-sans-custom leading-relaxed">
              Русский землепроходец, казачий пятидесятник, первым из европейцев достигший берегов Байкала в 1643 году
            </p>
            <div className="flex justify-center gap-4">
              <ShinyButton onClick={() => goTo(1)} className="px-8 py-3 text-base">
                Читать историю
              </ShinyButton>
              <button
                onClick={() => goTo(6)}
                className="px-8 py-3 text-base border border-white/20 rounded-lg text-white font-open-sans-custom hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                К открытию
              </button>
            </div>
          </div>
        </section>

        {/* Слайд 2 — Биография */}
        <section className="flex min-w-full snap-start items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-5xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-3 text-xs text-gray-400 font-open-sans-custom uppercase tracking-widest">01 · Биография</div>
                <h2 className="mb-6 text-4xl font-extrabold text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom lg:text-5xl">
                  Кто такой Курбат Иванов?
                </h2>
                <p className="text-gray-300 font-open-sans-custom leading-relaxed mb-4">
                  Курбат Афанасьевич Иванов — русский казачий пятидесятник, землепроходец и мореход XVII века. Он вошёл в историю как первый из известных европейцев, вышедший к берегам Байкала.
                </p>
                <p className="text-gray-300 font-open-sans-custom leading-relaxed">
                  Точные даты рождения и смерти неизвестны, однако его деятельность приходится на 1640–1660-е годы — эпоху активного освоения Сибири Российским государством.
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="https://cdn.poehali.dev/projects/5aaf8cd6-826a-459e-b30d-b65a0c98e07f/files/e15e6b7a-da0e-472a-a3d9-9a6592fe7311.jpg"
                  alt="Курбат Иванов"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white/70 text-xs font-open-sans-custom">
                  Художественное воссоздание образа землепроходца
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Слайд 3 — Происхождение */}
        <section className="flex min-w-full snap-start items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-4xl w-full">
            <div className="mb-3 text-xs text-gray-400 font-open-sans-custom uppercase tracking-widest text-center">02 · Происхождение</div>
            <h2 className="mb-10 text-4xl font-extrabold text-white text-center [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom">
              Откуда он был родом?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: "MapPin",
                  title: "Родина",
                  text: "Предположительно выходец из северных или центральных районов России. Точное место рождения в документах не зафиксировано.",
                },
                {
                  icon: "Sword",
                  title: "Казачье сословие",
                  text: "Принадлежал к служилым людям — казакам Сибирского приказа. Нёс государственную службу на восточных рубежах страны.",
                },
                {
                  icon: "BookOpen",
                  title: "В источниках",
                  text: "Впервые упоминается в документах 1640-х годов в Якутском остроге, откуда и отправился в свои знаменитые экспедиции.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                    <Icon name={item.icon as "MapPin"} size={20} className="text-white" />
                  </div>
                  <h3 className="mb-2 font-semibold text-white font-open-sans-custom">{item.title}</h3>
                  <p className="text-sm text-gray-300 font-open-sans-custom leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Слайд 4 — Служба */}
        <section className="flex min-w-full snap-start items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-4xl w-full">
            <div className="mb-3 text-xs text-gray-400 font-open-sans-custom uppercase tracking-widest text-center">03 · Служба</div>
            <h2 className="mb-10 text-4xl font-extrabold text-white text-center [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom">
              Казачья служба в Якутске
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                {[
                  { year: "1640", event: "Прибытие в Якутский острог и начало службы в составе казачьего гарнизона" },
                  { year: "1641", event: "Участие в разведывательных рейдах в окрестностях Якутска, сбор сведений о реках" },
                  { year: "1642", event: "Получение звания пятидесятника — командира отряда из 50 казаков" },
                  { year: "1643", event: "Назначение руководителем экспедиции на юг — к слухам о «великом озере»" },
                ].map((item) => (
                  <div key={item.year} className="flex gap-4 items-start">
                    <div className="min-w-[3.5rem] text-right font-mono text-white/50 text-sm pt-0.5">{item.year}</div>
                    <div className="h-full w-px bg-white/20 mt-1 flex-shrink-0 relative">
                      <div className="absolute -left-[3px] top-1.5 w-1.5 h-1.5 rounded-full bg-white/60" />
                    </div>
                    <p className="text-gray-300 font-open-sans-custom text-sm leading-relaxed">{item.event}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="mb-3 text-white font-semibold font-open-sans-custom">Якутский острог</h3>
                <p className="text-gray-300 text-sm font-open-sans-custom leading-relaxed mb-4">
                  Якутский острог был основан в 1632 году и стал главной базой для освоения восточной Сибири. Именно отсюда снаряжались экспедиции вглубь неизведанных территорий.
                </p>
                <p className="text-gray-300 text-sm font-open-sans-custom leading-relaxed">
                  Казаки выполняли двойную функцию: они были и воинами, и первопроходцами, прокладывая пути туда, куда ещё не ступала нога русского человека.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Слайд 5 — Начало экспедиции */}
        <section className="flex min-w-full snap-start items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-4xl w-full">
            <div className="mb-3 text-xs text-gray-400 font-open-sans-custom uppercase tracking-widest text-center">04 · Экспедиция</div>
            <h2 className="mb-6 text-4xl font-extrabold text-white text-center [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom">
              Начало великого похода · 1643
            </h2>
            <p className="text-center text-gray-300 font-open-sans-custom mb-10 max-w-2xl mx-auto">
              Весной 1643 года Курбат Иванов с отрядом из 74 казаков выступил из Якутска на юг — к легендарному «Ламскому морю», о котором рассказывали местные жители.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { num: "74", label: "Казаков в отряде" },
                { num: "1643", label: "Год экспедиции" },
                { num: "~1500", label: "км пути" },
                { num: "3", label: "Месяца в дороге" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm">
                  <div className="text-3xl font-mono font-bold text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] mb-1">
                    {item.num}
                  </div>
                  <div className="text-xs text-gray-400 font-open-sans-custom">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Слайд 6 — Путь к Байкалу */}
        <section className="flex min-w-full snap-start items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-5xl w-full">
            <div className="mb-3 text-xs text-gray-400 font-open-sans-custom uppercase tracking-widest text-center">05 · Путь</div>
            <h2 className="mb-10 text-4xl font-extrabold text-white text-center [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom">
              Путь к Байкалу
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                {[
                  { icon: "Navigation", title: "Якутск → Олёкма", text: "Отряд двинулся вверх по реке Лена, затем свернул на реку Олёкма — основной путь на юг." },
                  { icon: "Mountain", title: "Через Яблоновый хребет", text: "Преодоление сурового горного хребта в условиях сибирской зимы стало тяжелейшим испытанием." },
                  { icon: "Waves", title: "Река Ангара", text: "Выйдя к Ангаре, казаки поняли, что великое озеро совсем близко — вода несла запах и холод Байкала." },
                  { icon: "Flag", title: "Берег Байкала", text: "В июне 1643 года отряд достиг северо-западного берега Байкала — цель похода была достигнута." },
                ].map((step) => (
                  <div key={step.title} className="flex gap-4 items-start rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
                      <Icon name={step.icon as "Navigation"} size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white font-open-sans-custom text-sm mb-1">{step.title}</div>
                      <div className="text-gray-300 text-xs font-open-sans-custom leading-relaxed">{step.text}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="https://cdn.poehali.dev/projects/5aaf8cd6-826a-459e-b30d-b65a0c98e07f/files/d7439cce-fdd5-4dce-9230-2b0049528acb.jpg"
                  alt="Экспедиция к Байкалу"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Слайд 7 — Открытие Байкала */}
        <section className="flex min-w-full snap-start items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-4xl w-full text-center">
            <div className="mb-3 text-xs text-gray-400 font-open-sans-custom uppercase tracking-widest">06 · Открытие</div>
            <h2 className="mb-4 text-4xl font-extrabold text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom lg:text-6xl">
              Лето 1643 года
            </h2>
            <p className="text-5xl font-serif italic text-white/30 mb-8">«Великое море»</p>
            <div className="rounded-2xl border border-white/20 bg-white/5 p-8 backdrop-blur-sm mb-8 text-left max-w-3xl mx-auto">
              <p className="text-lg text-white/90 font-open-sans-custom leading-relaxed mb-4">
                Летом 1643 года казачий отряд под командованием Курбата Иванова вышел на берег огромного водоёма. Перед ними простиралось то, что местные буряты называли «Байгал» — «большая вода».
              </p>
              <p className="text-gray-300 font-open-sans-custom leading-relaxed">
                Иванов составил первый чертёж Байкала и подробное описание озера, его берегов и населяющих их народов. Этот документ стал первым официальным свидетельством существования Байкала для России.
              </p>
            </div>
            <div className="flex justify-center gap-3 flex-wrap">
              {["Первый чертёж Байкала", "Описание берегов", "Сведения о народах", "Донесение в Якутск"].map((tag) => (
                <span key={tag} className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-gray-300 font-open-sans-custom">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Слайд 8 — Байкал сегодня */}
        <section className="flex min-w-full snap-start items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-5xl w-full">
            <div className="mb-3 text-xs text-gray-400 font-open-sans-custom uppercase tracking-widest text-center">07 · Байкал</div>
            <h2 className="mb-10 text-4xl font-extrabold text-white text-center [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom">
              Байкал — что это такое?
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="https://cdn.poehali.dev/projects/5aaf8cd6-826a-459e-b30d-b65a0c98e07f/files/bdc15e6c-f156-4996-bb2f-5363facaca89.jpg"
                  alt="Озеро Байкал"
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white font-open-sans-custom font-semibold">Озеро Байкал</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Ruler", label: "Глубина", value: "1 642 м", sub: "Самое глубокое озеро мира" },
                  { icon: "Droplets", label: "Пресная вода", value: "20%", sub: "Мировых запасов" },
                  { icon: "ArrowLeftRight", label: "Длина", value: "636 км", sub: "С севера на юг" },
                  { icon: "Calendar", label: "Возраст", value: "25 млн лет", sub: "Древнейшее озеро" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name={item.icon as "Ruler"} size={14} className="text-white/60" />
                      <span className="text-xs text-gray-400 font-open-sans-custom">{item.label}</span>
                    </div>
                    <div className="text-xl font-bold text-white font-mono">{item.value}</div>
                    <div className="text-xs text-gray-400 font-open-sans-custom mt-1">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Слайд 9 — Карта экспедиции */}
        <section className="flex min-w-full snap-start items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-4xl w-full">
            <div className="mb-3 text-xs text-gray-400 font-open-sans-custom uppercase tracking-widest text-center">08 · Карта</div>
            <h2 className="mb-8 text-4xl font-extrabold text-white text-center [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom">
              Маршрут экспедиции
            </h2>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {[
                  { name: "Якутск", year: "1643, весна", icon: "Home" },
                  { name: "р. Олёкма", year: "1643, апрель", icon: "Waves" },
                  { name: "Яблоновый хр.", year: "1643, май", icon: "Mountain" },
                  { name: "р. Ангара", year: "1643, июнь", icon: "Waves" },
                  { name: "Байкал", year: "1643, лето", icon: "Star" },
                ].map((point, i, arr) => (
                  <div key={point.name} className="flex items-center gap-2 md:gap-3">
                    <div className="text-center">
                      <div className={cn(
                        "mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border",
                        i === arr.length - 1
                          ? "border-white bg-white text-black"
                          : "border-white/30 bg-white/10 text-white"
                      )}>
                        <Icon name={point.icon as "Home"} size={16} />
                      </div>
                      <div className="text-xs font-semibold text-white font-open-sans-custom whitespace-nowrap">{point.name}</div>
                      <div className="text-xs text-gray-400 font-open-sans-custom">{point.year}</div>
                    </div>
                    {i < arr.length - 1 && (
                      <Icon name="ChevronRight" size={16} className="text-white/30 flex-shrink-0 hidden md:block" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-gray-300 text-sm font-open-sans-custom leading-relaxed text-center">
                  Общий маршрут составил около 1500 км через непроходимую тайгу и горные хребты. Экспедиция длилась несколько месяцев в суровых условиях сибирского климата.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Слайд 10 — Наследие */}
        <section className="flex min-w-full snap-start items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-4xl w-full">
            <div className="mb-3 text-xs text-gray-400 font-open-sans-custom uppercase tracking-widest text-center">09 · Наследие</div>
            <h2 className="mb-8 text-4xl font-extrabold text-white text-center [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom">
              Историческое значение
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: "Map",
                  title: "Первый чертёж Байкала",
                  text: "Курбат Иванов составил первую в истории карту-чертёж Байкала и прилегающих территорий, которая легла в основу всех последующих географических описаний.",
                },
                {
                  icon: "FileText",
                  title: "Официальное донесение",
                  text: "Подробный отчёт, отправленный в Якутск, стал первым официальным документом о существовании Байкала. Это открыло путь для дальнейшего освоения Прибайкалья.",
                },
                {
                  icon: "Globe",
                  title: "Включение в состав России",
                  text: "Благодаря экспедиции Иванова, а затем Семёна Скоробогатого, Прибайкалье было окончательно включено в состав Российского государства.",
                },
                {
                  icon: "Users",
                  title: "Описание народов",
                  text: "Иванов первым описал быт и нравы бурятских племён, живших на берегах Байкала, что стало ценным этнографическим свидетельством эпохи.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Icon name={item.icon as "Map"} size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white font-open-sans-custom mb-1">{item.title}</div>
                    <div className="text-sm text-gray-300 font-open-sans-custom leading-relaxed">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Слайд 11 — Авторы */}
        <section className="flex min-w-full snap-start items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-3xl w-full text-center">
            <div className="mb-3 text-xs text-gray-400 font-open-sans-custom uppercase tracking-widest">10 · Авторы проекта</div>
            <h2 className="mb-10 text-4xl font-extrabold text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom">
              Над проектом работали
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {[
                { name: "Чванина Анастасия", role: "Исследование и текст" },
                { name: "Сахарова Виктория", role: "Дизайн и оформление" },
              ].map((author) => (
                <div key={author.name} className="rounded-2xl border border-white/20 bg-white/5 p-8 backdrop-blur-sm">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 border border-white/20">
                    <Icon name="User" size={28} className="text-white" />
                  </div>
                  <div className="text-xl font-semibold text-white font-open-sans-custom mb-1">{author.name}</div>
                  <div className="text-sm text-gray-400 font-open-sans-custom">{author.role}</div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm mb-6">
              <p className="text-gray-300 font-open-sans-custom leading-relaxed italic">
                «Курбат Иванов — человек, чьё имя незаслуженно забыто. Но именно он открыл миру жемчужину планеты — озеро Байкал.»
              </p>
            </div>
            <button
              onClick={() => goTo(0)}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-open-sans-custom text-sm transition-colors"
            >
              <Icon name="RotateCcw" size={14} />
              Вернуться в начало
            </button>
          </div>
        </section>

      </div>
    </main>
  )
}
