import { GameTypes, SequenceInput } from "./types"

export const sequenceOptions = [
  {
    name: "play_code",
    label: "Play Code",
    options: [
      { value: "DHO", label: "Dribble Handoff (DHO)" },
      { value: "FB", label: "Fast Break (FB) - Transition and all alone" },
      {
        value: "FBT",
        label: "Fast Break Traditional (FBT) - Advantage on the offensive side on the Fast Break, 2 v 1, 3 v 2, etc.",
      },
      {
        value: "FST",
        label:
          "Fast Break Semi Transition (FST) - No advantage to the offensive side and some defenders may be set already",
      },
      { value: "HO", label: "Handoff (HO) - Handoff with no dribble" },
      { value: "ISO", label: "Isolation (ISO) - 1 v 1 in the half court" },
      { value: "OBS", label: "Off-ball Screen (OBS) - Screen away from the ball" },
      { value: "PASS", label: "Pass (PASS) - Attack movement directly off of the pass" },
      { value: "PNR", label: "Pick and Roll (PNR) - Screen set for the ball handler" },
      { value: "REB", label: "Rebound (REB) - Grabbing the ball off of a missed shot" },
    ],
  },
  {
    name: "initial_direction",
    label: "Initial Direction",
    options: [
      { value: "0", label: "No dribble (0)" },
      { value: "1L", label: "Pound dribble left (1L)" },
      { value: "1R", label: "Pound dribble right (1R)" },
      { value: "2L", label: "Crossover going left (2L)" },
      { value: "2R", label: "Crossover going right (2R)" },
      { value: "3L", label: "In and Out left (3L)" },
      { value: "3R", label: "In and Out right (3R)" },
      { value: "4L", label: "Between the legs left (4L)" },
      { value: "4R", label: "Between the legs right (4R)" },
      { value: "5L", label: "Behind the back left (5L)" },
      { value: "5R", label: "Behind the back right (5R)" },
      { value: "5.5L", label: "Half spin to the left (5.5L)" },
      { value: "5.5R", label: "Half spin to the right (5.5R)" },
      { value: "6L", label: "Full spin left (6L)" },
      { value: "6R", label: "Full spin right (6R)" },
      { value: "1S", label: "Straight pound (1S)" },
      { value: "2S", label: "Straight crossover (2S)" },
      { value: "3S", label: "Straight in and out (3S)" },
      { value: "4S", label: "Straight between the legs (4S)" },
      { value: "5S", label: "Straight behind the back (5S)" },
      //   { value: "5.5S", label: "Half spin to the right (5.5S)" },
      { value: "6S", label: "Full Spin (6S)" },
    ],
  },
  {
    name: "counter_direction",
    label: "Counter Direction",
    options: [
      { value: "0", label: "No counter direction dribble (0)" },
      { value: "1L", label: "Pound dribble left (1L)" },
      { value: "1R", label: "Pound dribble right (1R)" },
      { value: "2L", label: "Crossover going left (2L)" },
      { value: "2R", label: "Crossover going right (2R)" },
      { value: "3L", label: "In and Out left (3L)" },
      { value: "3R", label: "In and Out right (3R)" },
      { value: "4L", label: "Between the legs left (4L)" },
      { value: "4R", label: "Between the legs right (4R)" },
      { value: "5L", label: "Behind the back left (5L)" },
      { value: "5R", label: "Behind the back right (5R)" },
      { value: "5.5L", label: "Half spin to the left (5.5L)" },
      { value: "5.5R", label: "Half spin to the right (5.5R)" },
      { value: "6L", label: "Full spin left (6L)" },
      { value: "6R", label: "Full spin right (6R)" },
      { value: "1S", label: "Straight pound (1S)" },
      { value: "2S", label: "Straight crossover (2S)" },
      { value: "3S", label: "Straight in and out (3S)" },
      { value: "4S", label: "Straight between the legs (4S)" },
      { value: "5S", label: "Straight behind the back (5S)" },
      { value: "6S", label: "Full Spin (6S)" },
    ],
  },
  {
    name: "last_dribble_type",
    label: "Last Dribble Type",
    options: [
      { value: "0", label: "No dribble (0)" },
      { value: "1L", label: "Pound dribble left (1L)" },
      { value: "1R", label: "Pound dribble right (1R)" },
      { value: "2L", label: "Crossover going left (2L)" },
      { value: "2R", label: "Crossover going right (2R)" },
      { value: "3L", label: "In and Out left (3L)" },
      { value: "3R", label: "In and Out right (3R)" },
      { value: "4L", label: "Between the legs left (4L)" },
      { value: "4R", label: "Between the legs right (4R)" },
      { value: "5L", label: "Behind the back left (5L)" },
      { value: "5R", label: "Behind the back right (5R)" },
      { value: "5.5L", label: "Half spin to the left (5.5L)" },
      { value: "5.5R", label: "Half spin to the right (5.5R)" },
      { value: "6L", label: "Full spin left (6L)" },
      { value: "6R", label: "Full spin right (6R)" },
      { value: "1S", label: "Straight pound (1S)" },
      { value: "2S", label: "Straight crossover (2S)" },
      { value: "3S", label: "Straight in and out (3S)" },
      { value: "4S", label: "Straight between the legs (4S)" },
      { value: "5S", label: "Straight behind the back (5S)" },
      { value: "6S", label: "Full Spin (6S)" },
    ],
  },
  {
    name: "type_of_shot",
    label: "Type of Shot",
    options: [
      { value: "BS", label: "Blocked Shot (BS) - The defender knocks this shot out of the air" },
      {
        value: "CS2",
        label:
          "Catch and Shoot (CS2) - A player catches the ball inside of the 3-point line and shoots without dribbling",
      },
      {
        value: "CS3",
        label: "Catch and Shoot (CS3) - A player catches the ball behind the 3-point line and shoots without dribbling",
      },
      {
        value: "DK",
        label: "Dunk (DK) - The player scores at the rim and hand hits the rim while throwing the ball into the hoop",
      },
      {
        value: "FA2",
        label: "Fadeaway 2 pointer (FA2) - A player jumps away from the basket while shooting inside the 3-point line",
      },
      {
        value: "FA3",
        label:
          "Fadeaway 3 pointer (FA3) - A player jumps away from the basket while shooting from behind the 3-point line",
      },
      {
        value: "FLT",
        label:
          "Floater (FLT) - Extended lay-up/shot from close, but not directly at the basket, lofting the ball into the air",
      },
      {
        value: "LU",
        label:
          "Layup (LU) - Shooting a shot right at the basket and the player's hand is near the rim, but not touching it",
      },
      {
        value: "PU2",
        label: "Pull up 2 pointer (PU2) - A player shoots off of the dribble from inside of the 3-point line",
      },
      {
        value: "PU3",
        label: "Pull up 3 pointer (PU3) - A player shoots off of the dribble from behind of the 3-point line",
      },
      { value: "RU", label: "Runner (RU) - Similar to a floater but more of a horizontal jump from dribbling at pace" },
      {
        value: "SB2",
        label:
          "Step-back 2 (SB2) - When a player gathers to shoot while taking a step backward to create space for a shot inside the 3-point line",
      },
      {
        value: "SB3",
        label:
          "Step-back 3 (SB3) - When a player gathers to shoot while taking a step backward to create space for a shot behind the 3-point line",
      },
      {
        value: "SS2",
        label:
          "Side-step 2 (SS2) - When a player gathers to shoot while taking a side step to create space for a shot inside the 3-point line",
      },
      {
        value: "SS3",
        label:
          "Side-step 3 (SS3) - When a player gathers to shoot while taking a side step to create space for a shot behind the 3-point line",
      },
      { value: "TO", label: "Turnover (TO) - When the defense takes the ball from the offense" },
      {
        value: "TU",
        label: "Tie up (TU) - An offensive and defensive players are struggling over the ball resulting in a jump ball",
      },
    ],
  },
  {
    name: "pick_and_roll",
    label: "Pick & Roll",
    options: [
      {
        value: "BLTZ",
        label:
          "Blitz (BLTZ) - Both screener and ball handler defenders jump the ball handler, wanting to force the ball handler to pass the ball",
      },
      { value: "DRP", label: "Drop (DRP) - The screener’s defender sits off of screen action" },
      {
        value: "HH",
        label:
          "Hard Hedge (HH) - The screener’s defender moves up on-screen action to prevent the ball handler from getting around the screen",
      },
      {
        value: "ICE",
        label: "Ice (ICE) - The screener’s defender forces the ball handler to go in whichever direction they want",
      },
      {
        value: "PSH",
        label:
          "Push (PSH) - The screener’s defender pushes into screen action to allow the ball handler’s defender to go under the screen action",
      },
      {
        value: "SH",
        label:
          "Soft Hedge (SH) - The screener’s defender is right next to the screen, but below the line of the ball (not as aggressive as a hard hedge)",
      },
      {
        value: "SWT",
        label:
          "Switch (SWT) - Once the screen is set, the screener’s defender is now the ball handler’s defender and vice versa. The defensive teammates trade who they’re guarding",
      },
      { value: "NPNR", label: "No Pick and Roll (NPNR) - No ball-screen action" },
    ],
  },
  // Optional:
  {
    name: "defender_pick_and_roll",
    label: "Defender Pick & Roll",
    options: [
      { value: "over", label: "Over" },
      { value: "under", label: "Under" },
      { value: "hold_pick", label: "Hold Pick" },
      { value: "show", label: "Show" },
      { value: "blitz", label: "Blitz" },
    ],
  },
  {
    name: "ball_handler_pick_and_roll",
    label: "Ball Handler Pick & Roll",
    options: [
      { value: "turn_the_corner", label: "Turn the corner" },
      { value: "drag", label: "Drag" },
      { value: "behind", label: "Behind" },
      { value: "dribble_hold", label: "Dribble Hold" },
      { value: "split", label: "Split" },
      { value: "snake", label: "Snake" },
      { value: "twist", label: "Twist" },
      { value: "reject", label: "Reject" },
      { value: "re_screen", label: "Re-screen" },
    ],
  },
] as SequenceInput[]

export const INITIAL_GAME_TYPE = GameTypes.COLLEGE

export const gameTypesPeriods = {
  [GameTypes.COLLEGE]: 3,
  [GameTypes.HIGH_SCHOOL]: 5,
  [GameTypes.PROFESSIONAL]: 5,
}

export const PERMANENT_MARKER_CLASS = "permanent-marker"
