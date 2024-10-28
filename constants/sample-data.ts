export const reportListSampleData = [
  {
    id: 1,
    player_id: {
      team_id: {
        code: "LAL",
        name: "Los Angeles Lakers",
        abbreviation: "LAL",
      },
    },
    game_id: {
      date: "2024-10-28",
      home_team_id: {
        code: "LAL",
        name: "Los Angeles Lakers",
        abbreviation: "LAL",
      },
      away_team_id: {
        code: "GSW",
        name: "Golden State Warriors",
        abbreviation: "GSW",
      },
    },
    sequence: [
      {
        moves: [
          { code: 4, x: 23, y: 15 },
          { code: 2, x: 25, y: 18 },
          { code: 7, x: 28, y: 22 },
        ],
        moveUids: ["move1", "move2", "move3"],
        combos: [
          [
            { code: 2, x: 20, y: 12 },
            { code: 4, x: 22, y: 15 },
          ],
        ],
        play_code: "ISO",
        initial_direction: "4R",
        counter_direction: "2L",
        last_dribble_type: "1S",
        type_of_shot: "PU3",
        screener_pick_and_roll: "NPNR",
        on_ball_defender_pick_and_roll: null,
        ball_handler_pick_and_roll: "NPNR",
        lanes_left: "30",
        lanes_middle: "40",
        lanes_right: "30",
        period: 1,
        move: [
          { code: 4, x: 23, y: 15 },
          { code: 2, x: 25, y: 18 },
          { code: 7, x: 28, y: 22 },
        ],
        combo: [
          { code: 2, x: 20, y: 12 },
          { code: 4, x: 22, y: 15 },
        ],
      },
      {
        moves: [
          { code: 1, x: -15, y: 30 },
          { code: 5, x: -12, y: 28 },
          { code: 8, x: -10, y: 25 },
        ],
        moveUids: ["move4", "move5", "move6"],
        combos: [
          [
            { code: 3, x: -18, y: 32 },
            { code: 6, x: -14, y: 29 },
          ],
        ],
        play_code: "PNR",
        initial_direction: "1L",
        counter_direction: "5R",
        last_dribble_type: "2S",
        type_of_shot: "SB3",
        screener_pick_and_roll: "HH",
        on_ball_defender_pick_and_roll: "ICE",
        ball_handler_pick_and_roll: "DRP",
        lanes_left: "25",
        lanes_middle: "50",
        lanes_right: "25",
        period: 1,
        move: [
          { code: 1, x: -15, y: 30 },
          { code: 5, x: -12, y: 28 },
          { code: 8, x: -10, y: 25 },
        ],
        combo: [
          { code: 3, x: -18, y: 32 },
          { code: 6, x: -14, y: 29 },
        ],
      },
    ],
    points: 3,
  },
  {
    id: 2,
    player_id: {
      team_id: {
        code: "GSW",
        name: "Golden State Warriors",
        abbreviation: "GSW",
      },
    },
    game_id: {
      date: "2024-10-28",
      home_team_id: {
        code: "LAL",
        name: "Los Angeles Lakers",
        abbreviation: "LAL",
      },
      away_team_id: {
        code: "GSW",
        name: "Golden State Warriors",
        abbreviation: "GSW",
      },
    },
    sequence: [
      {
        moves: [
          { code: 2, x: -30, y: -15 },
          { code: 4, x: -28, y: -12 },
          { code: 7, x: -25, y: -10 },
        ],
        moveUids: ["move7", "move8", "move9"],
        combos: [
          [
            { code: 1, x: -32, y: -18 },
            { code: 3, x: -29, y: -14 },
          ],
        ],
        play_code: "FST",
        initial_direction: "2R",
        counter_direction: "4L",
        last_dribble_type: "3S",
        type_of_shot: "CS3",
        screener_pick_and_roll: "NPNR",
        on_ball_defender_pick_and_roll: null,
        ball_handler_pick_and_roll: "NPNR",
        lanes_left: "20",
        lanes_middle: "60",
        lanes_right: "20",
        period: 2,
        move: [
          { code: 2, x: -30, y: -15 },
          { code: 4, x: -28, y: -12 },
          { code: 7, x: -25, y: -10 },
        ],
        combo: [
          { code: 1, x: -32, y: -18 },
          { code: 3, x: -29, y: -14 },
        ],
      },
    ],
    points: 2,
  },
]
