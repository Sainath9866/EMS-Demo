type ScheduleItem = {
  id: string
  title: string
  subtitle?: string
  color: string
  avatarBg: string
  dayIndex: number // 0=Sun ... 6=Sat
  startHour: number // 8 -> 8:00
  endHour: number // 14 -> 14:00
  tasks?: number
  hours?: number
}

const HOURS_START = 8
const HOURS_END = 14
const TOTAL_HOURS = HOURS_END - HOURS_START

const items: ScheduleItem[] = [
  {
    id: 'ux',
    title: 'UX Research',
    subtitle: 'Lesson 3',
    color: 'bg-indigo-500',
    avatarBg: 'bg-indigo-600',
    dayIndex: 1,
    startHour: 9,
    endHour: 13,
    tasks: 4,
    hours: 16,
  },

  
  {
    id: 'analysis',
    title: 'Analysis',
    subtitle: 'Lesson 2',
    color: 'bg-green-400',
    avatarBg: 'bg-green-500',
    dayIndex: 2,
    startHour: 9,
    endHour: 12,
    tasks: 3,
    hours: 12,
  },
  {
    id: 'blender',
    title: 'Blender',
    subtitle: 'Lesson 3',
    color: 'bg-rose-400',
    avatarBg: 'bg-rose-500',
    dayIndex: 2,
    startHour: 12,
    endHour: 14,
    tasks: 3,
    hours: 12,
  },
  {
    id: 'api-integration',
    title: 'API Integration',
    subtitle: 'Payments',
    color: 'bg-emerald-500',
    avatarBg: 'bg-emerald-600',
    dayIndex: 3,
    startHour: 10,
    endHour: 13,
    tasks: 3,
    hours: 3,
  },
  {
    id: 'ui',
    title: 'UI Animation',
    subtitle: 'Lesson 3',
    color: 'bg-amber-400',
    avatarBg: 'bg-amber-500',
    dayIndex: 4,
    startHour: 10,
    endHour: 13,
    tasks: 4,
    hours: 16,
  },
  {
    id: 'code-review',
    title: 'Code Review',
    subtitle: 'PRs & Linting',
    color: 'bg-violet-500',
    avatarBg: 'bg-violet-600',
    dayIndex: 5,
    startHour: 9,
    endHour: 11,
    tasks: 2,
    hours: 2,
  },
  {
    id: 'graphic',
    title: 'Graphic Design',
    subtitle: 'Lesson 3',
    color: 'bg-sky-500',
    avatarBg: 'bg-sky-600',
    dayIndex: 5,
    startHour: 11,
    endHour: 13,
    tasks: 4,
    hours: 16,
  },
]

function positionFor(startHour: number, endHour: number) {
  const leftPct = ((startHour - HOURS_START) / TOTAL_HOURS) * 100
  const widthPct = ((endHour - startHour) / TOTAL_HOURS) * 100
  return { left: `${leftPct}%`, width: `${widthPct}%` }
}

function packItems(itemsForDay: ScheduleItem[]): { packed: Array<{ it: ScheduleItem; lane: number }>; lanes: number } {
  const sorted = [...itemsForDay].sort((a, b) => a.startHour - b.startHour || a.endHour - b.endHour)
  const laneEnd: number[] = []
  const packed: Array<{ it: ScheduleItem; lane: number }> = []

  for (const it of sorted) {
    let laneIndex = laneEnd.findIndex((end) => it.startHour >= end)
    if (laneIndex === -1) {
      laneIndex = laneEnd.length
      laneEnd.push(it.endHour)
    } else {
      laneEnd[laneIndex] = it.endHour
    }
    packed.push({ it, lane: laneIndex })
  }

  return { packed, lanes: laneEnd.length || 1 }
}

export default function Schedule() {
  // Render only Monday to Friday
  const days: { label: string; index: number }[] = [
    { label: 'Mon', index: 1 },
    { label: 'Tue', index: 2 },
    { label: 'Wed', index: 3 },
    { label: 'Thu', index: 4 },
    { label: 'Fri', index: 5 },
  ]
  const hours = Array.from({ length: TOTAL_HOURS + 1 }, (_, i) => HOURS_START + i)

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Schedule</h3>
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <span>Full schedule</span>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">📅</span>
        </div>
      </div>

      {/* Hours scale */}
      <div className="pl-16 pr-2">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}>
          <div className="col-span-7">
            <div className="relative">
              <div className="ml-0 mr-0">
                <div className="grid text-xs text-gray-500" style={{ gridTemplateColumns: `repeat(${TOTAL_HOURS + 1}, minmax(0, 1fr))` }}>
                  {hours.map((h) => (
                    <div key={h} className="text-center">{h}:00</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rows */}
      <div className="mt-2">
        {days.map(({ label, index }) => {
          const dayItems = items.filter((it) => it.dayIndex === index)
          const { packed, lanes } = packItems(dayItems)
          const rowHeight = 56 + (lanes - 1) * 48 // base 56px + 48px per extra lane
          return (
          <div key={label} className="relative pl-16 pr-2 py-4 border-t border-gray-100">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 w-10 text-right">{label}</div>
            <div className="relative rounded-xl bg-gray-50/50" style={{ height: `${rowHeight}px` }}>
              {/* time grid lines */}
              <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${TOTAL_HOURS}, minmax(0, 1fr))` }}>
                {Array.from({ length: TOTAL_HOURS }).map((_, i) => (
                  <div key={i} className="border-r border-gray-100" />
                ))}
              </div>
              {/* items for this row */}
              {packed
                .map(({ it, lane }) => {
                  const pos = positionFor(it.startHour, it.endHour)
                  const top = 8 + lane * 48 // 8px inset + each lane 48px tall
                  return (
                    <div
                      key={it.id}
                      className={`absolute h-12 ${it.color} rounded-full shadow-md text-white flex items-center gap-3 pl-3 pr-4`}
                      style={{ left: pos.left, width: pos.width, top }}
                    >
                      <div className={`h-8 w-8 rounded-full ${it.avatarBg} ring-2 ring-white/40`} />
                      <div className="truncate">
                        <div className="text-[10px] opacity-80 leading-3">{it.subtitle}</div>
                        <div className="text-sm font-semibold truncate">{it.title}</div>
                      </div>
                      <div className="ml-auto hidden md:flex items-center gap-3 text-[10px]">
                        <div className="px-2 py-1 rounded-full bg-white/20 backdrop-blur">Tasks {it.tasks ?? '-'}</div>
                        <div className="px-2 py-1 rounded-full bg-white/20 backdrop-blur">Hours {it.hours ?? '-'}</div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        )})}
      </div>
    </div>
  )
}


