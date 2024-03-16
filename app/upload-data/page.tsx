"use client"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { uploadPlayers, uploadTeams } from "@/utils/upload-db-data"

// Commented out so no one accidentally re-adds these teams and players

// const teams = [
//   { name: "Boston Celtics" },
//   { name: "Brooklyn Nets" },
//   { name: "New York Knicks" },
//   { name: "Philadelphia 76ers" },
//   { name: "Toronto Raptors" },
//   { name: "Chicago Bulls" },
//   { name: "Cleveland Cavaliers" },
//   { name: "Detroit Pistons" },
//   { name: "Indiana Pacers" },
//   { name: "Milwaukee Bucks" },
//   { name: "Atlanta Hawks" },
//   { name: "Charlotte Hornets" },
//   { name: "Miami Heat" },
//   { name: "Orlando Magic" },
//   { name: "Washington Wizards" },
//   { name: "Denver Nuggets" },
//   { name: "Minnesota Timberwolves" },
//   { name: "Oklahoma City Thunder" },
//   { name: "Portland Trail Blazers" },
//   { name: "Utah Jazz" },
//   { name: "Golden State Warriors" },
//   { name: "Los Angeles Clippers" },
//   { name: "Los Angeles Lakers" },
//   { name: "Phoenix Suns" },
//   { name: "Sacramento Kings" },
//   { name: "Dallas Mavericks" },
//   { name: "Houston Rockets" },
//   { name: "Memphis Grizzlies" },
//   { name: "New Orleans Pelicans" },
//   { name: "San Antonio Spurs" },
// ]

// const players = [
//   { name: "Jayson Tatum", jersey: "0", team_id: "1" },
//   { name: "Jaylen Brown", jersey: "7", team_id: "1" },
//   { name: "Mikal Bridges", jersey: "25", team_id: "2" },
//   { name: "Jalen Brunson", jersey: "13", team_id: "3" },
//   { name: "Julius Randle", jersey: "30", team_id: "3" },
//   { name: "Joel Embiid", jersey: "21", team_id: "4" },
//   { name: "Tyrese Maxey", jersey: "0", team_id: "4" },
//   { name: "Scottie Barnes", jersey: "4", team_id: "5" },
//   { name: "Demar Derozan", jersey: "11", team_id: "6" },
//   { name: "Coby White", jersey: "0", team_id: "6" },
//   { name: "Donovan Mitchell", jersey: "45", team_id: "7" },
//   { name: "Darius Garland", jersey: "10", team_id: "7" },
//   { name: "Cade Cunningham", jersey: "2", team_id: "8" },
//   { name: "Tyrese Haliburton", jersey: "0", team_id: "9" },
//   { name: "Giannis Antetokounmpo", jersey: "34", team_id: "10" },
//   { name: "Damian Lillard", jersey: "0", team_id: "10" },
//   { name: "Trae Young", jersey: "11", team_id: "11" },
//   { name: "Lamelo Ball", jersey: "2", team_id: "12" },
//   { name: "Brandon Miller", jersey: "24", team_id: "12" },
//   { name: "Jimmy Butler", jersey: "22", team_id: "13" },
//   { name: "Paolo Banchero", jersey: "5", team_id: "14" },
//   { name: "Franz Wagner", jersey: "22", team_id: "14" },
//   { name: "Jordan Poole", jersey: "3", team_id: "15" },
//   { name: "Nikola Jokic", jersey: "15", team_id: "16" },
//   { name: "Jamal Murray", jersey: "27", team_id: "16" },
//   { name: "Anthony Edwards", jersey: "5", team_id: "17" },
//   { name: "Shai Gilgeous-Alexander", jersey: "2", team_id: "18" },
//   { name: "Anfernee Simons", jersey: "1", team_id: "19" },
//   { name: "Lauri Markkanen", jersey: "23 ", team_id: "20" },
//   { name: "Steph Curry", jersey: "30", team_id: "21" },
//   { name: "Kawhi Leonard", jersey: "2", team_id: "22" },
//   { name: "Paul George", jersey: "13", team_id: "22" },
//   { name: "James Harden", jersey: "1", team_id: "22" },
//   { name: "Lebron James", jersey: "6", team_id: "23" },
//   { name: "D'Angelo Russell", jersey: "0", team_id: "23" },
//   { name: "Kevin Durant", jersey: "7", team_id: "24" },
//   { name: "Devin Booker", jersey: "1", team_id: "24" },
//   { name: "De'Aaron Fox", jersey: "5", team_id: "25" },
//   { name: "Luka Doncic", jersey: "11", team_id: "26" },
//   { name: "Kyrie Irving", jersey: "2", team_id: "26" },
//   { name: "Jalen Green", jersey: "4", team_id: "27" },
//   { name: "Fred Van Vleet", jersey: "23", team_id: "27" },
//   { name: "Ja Morant", jersey: "12", team_id: "28" },
//   { name: "Brandon Ingram", jersey: "14", team_id: "29" },
//   { name: "Zion Williamson", jersey: "1", team_id: "29" },
//   { name: "Wemby", jersey: "1", team_id: "30" },
// ]

const teams = [] as any
const players = [] as any

export default function UploadDataPage() {
  const supabase = createClient()
  return (
    <div className="flex gap-4 p-10">
      <Button onClick={() => uploadTeams(supabase, teams)}>Upload teams</Button>
      <Button onClick={() => uploadPlayers(supabase, players)}>Upload players</Button>
    </div>
  )
}
