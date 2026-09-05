import Image from "next/image"
import Link from "next/link"

import { getTeamsWithPlayers } from "../teams-queries"

export async function TeamList() {
  const teams = await getTeamsWithPlayers()
  if (!teams) return null

  return (
    <div className="padding flex flex-wrap justify-center gap-5 py-8">
      {teams.map((team) => (
        <div
          key={team.id}
          className="group border-milky-white text-light-blue relative h-[190px] w-[340px] border-2 shadow-[0px_4px_15px_0px_rgba(94,114,235,0.45)]"
        >
          <Image
            height={151}
            width={340}
            src={team.flag}
            alt={`${team.name}'s flag`}
            className="h-[151px] w-[340px] select-none"
          />

          <div className="bg-fade absolute top-0 h-full w-full opacity-100 transition-all sm:opacity-0 sm:group-hover:opacity-100" />
          <div className="from-milky-white absolute bottom-0 h-full w-full bg-linear-to-t from-30% to-transparent to-50%">
            <div className="relative h-full w-full">
              <div className="grid w-full grid-cols-2 gap-2 p-2 opacity-100 transition-all sm:opacity-0 sm:group-hover:opacity-100">
                {team.players.map(({ user }) => (
                  <Link
                    key={user?.osuId}
                    target="_blank"
                    href={`https://osu.ppy.sh/users/${user?.osuId}`}
                    className="flex gap-2 focus:outline-hidden"
                  >
                    <Image
                      height={32}
                      width={32}
                      src={user?.osuAvatar ?? ""}
                      alt={`${user?.osuName}'s pfp`}
                      className="size-[32px]"
                    />

                    <div className="flex w-full flex-col justify-center">
                      <div className="w-[120px] truncate overflow-hidden text-sm/3 font-extrabold">
                        {user?.osuName}
                      </div>
                      <div className="text-xs">
                        #{user?.rank?.toLocaleString()}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="absolute bottom-0 w-full px-2 py-1">
                <div className="text-xl font-extrabold">{team.name}</div>

                <div className="flex justify-between">
                  <div>{team.acronym}</div>
                  <div>{team.timezone}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function TeamListSkeleton() {
  return (
    <div className="padding flex flex-wrap justify-center gap-5 py-8">
      {Array.from({ length: 32 })
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="h-[190px] w-[340px] animate-pulse bg-gray-200"
          />
        ))}
    </div>
  )
}
