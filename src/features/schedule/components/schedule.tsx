import Image from "next/image"

import { cn } from "cn"

import { getMatchesWithTeamsAndPlayers } from "../schedule-queries"

export async function Schedule() {
  const matches = await getMatchesWithTeamsAndPlayers()

  return (
    <div className="padding flex flex-col gap-3 py-8">
      {matches?.map((match) => (
        <div
          key={match.matchId}
          className="flex flex-col justify-center md:flex-row md:items-center md:gap-3"
        >
          <div
            className={cn(
              "no-bottom-shadow flex h-[90px] w-full items-center justify-center gap-3 md:w-[250px]",
              match.type === "winner" &&
                "text-light-blue shadow-[0px_0px_15px_0px_rgba(94,114,235,0.45)] md:shadow-[0px_4px_15px_0px_rgba(94,114,235,0.45)]",
              match.type === "loser" &&
                "text-[#FF9190] shadow-[0px_0px_15px_0px_rgba(255,145,144,0.45)] md:shadow-[0px_4px_15px_0px_rgba(255,145,144,0.45)]",
              match.type === "loser2" &&
                "text-[#FDC094] shadow-[0px_0px_15px_0px_rgba(253,192,148,0.45)] md:shadow-[0px_4px_15px_0px_rgba(253,192,148,0.45)]"
            )}
          >
            <div className="text-5xl font-extrabold">{match.matchId}</div>
            <div>
              <div className="font-sm font-extrabold">
                {match.date} | {match.time}
              </div>
              <div className="text-xs">
                <span className="font-extrabold">REFEREE: </span>
                {match.referee}
              </div>
            </div>
          </div>

          <div
            className={cn(
              "no-top-shadow relative flex grow justify-between",
              match.type === "winner" &&
                "shadow-[0px_0px_15px_0px_rgba(94,114,235,0.45)] md:shadow-[0px_4px_15px_0px_rgba(94,114,235,0.45)]",
              match.type === "loser" &&
                "shadow-[0px_0px_15px_0px_rgba(255,145,144,0.45)] md:shadow-[0px_4px_15px_0px_rgba(255,145,144,0.45)]",
              match.type === "loser2" &&
                "shadow-[0px_0px_15px_0px_rgba(253,192,148,0.45)] md:shadow-[0px_4px_15px_0px_rgba(253,192,148,0.45)]"
            )}
          >
            <div className="relative">
              <Image
                width={230}
                height={90}
                src={match.team1.flag}
                alt="team flag"
                className="h-[90px]"
              />
              <div className="to-milky-white absolute top-0 right-0 h-full w-full bg-linear-to-r from-transparent to-60%" />
            </div>

            <div className="padding absolute top-0 left-0 z-20 flex h-full w-full items-center justify-between">
              <div className="text-light-blue">
                <div className="text-left text-lg font-extrabold lg:text-xl">
                  {match.team1.name}
                </div>
                <div className="text-xs font-medium lg:text-sm">
                  AVG RANK: #
                  {match.team1.players
                    .reduce((acc, player) => acc + (player.user.rank ?? 0), 0)
                    .toLocaleString()}
                </div>
              </div>

              <div className="flex gap-1 text-xl font-extrabold text-[#CECBF5] lg:text-3xl">
                <div
                  className={cn(
                    match.team1Score > match.team2Score && "text-blue"
                  )}
                >
                  {match.team1Score}
                </div>
                <div>-</div>
                <div
                  className={cn(
                    match.team1Score < match.team2Score && "text-blue"
                  )}
                >
                  {match.team2Score}
                </div>
              </div>

              <div className="text-[#FF9190]">
                <div className="text-right text-lg font-extrabold lg:text-xl">
                  {match.team2.name}
                </div>
                <div className="text-right text-xs font-medium lg:text-sm">
                  AVG RANK: #
                  {match.team1.players
                    .reduce((acc, player) => acc + (player.user.rank ?? 0), 0)
                    .toLocaleString()}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="to-milky-white absolute top-0 left-0 h-full w-full bg-linear-to-l from-transparent to-60%" />

              <Image
                width={230}
                height={90}
                src={match.team2.flag}
                alt="team flag"
                className="h-[90px]"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ScheduleSkeleton() {
  return (
    <div className="padding flex flex-col gap-3 py-8">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col justify-center md:flex-row md:items-center md:gap-3"
        >
          <div className="h-[90px] w-full animate-pulse bg-gray-200 md:w-[250px]" />
          <div className="h-[90px] w-full animate-pulse bg-gray-200" />
        </div>
      ))}
    </div>
  )
}
