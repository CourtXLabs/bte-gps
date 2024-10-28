const sectionClasses = "mt-5"
const sectionTitleClasses = "text-lg mt-4 font-bold"
const contentClasses = "ml-3"
const mainListStyle = "list-disc"
const secondaryListStyle = "list-[square]"

export default function AboutUs() {
  return (
    <div className="mx-auto max-w-7xl gap-12 px-4 py-20">
      <h1 className="text-2xl font-bold">BTE Analytics - Data Analyst Study Guide</h1>

      <div className={sectionClasses}>
        <div className={contentClasses}>
          <h2 className={sectionTitleClasses}>Play Code</h2>
          <ul className={mainListStyle}>
            <li>
              Dribble Handoff = <strong>DHO</strong>
            </li>
            <li>
              Fast Break = <strong>FB</strong>
              <ul className={secondaryListStyle}>
                <li>Transition and all alone</li>
              </ul>
            </li>

            <li>
              Fast Break Traditional = <strong>FBT</strong>
              <ul className={secondaryListStyle}>
                <li>Advantage on the offensive side on the Fast Break (e.g., 2 v 1, 3 v 2)</li>
              </ul>
            </li>

            <li>
              Fast Break Semi Transition = <strong>FST</strong>
              <ul className={secondaryListStyle}>
                <li>No advantage to the offensive side and some defenders may be set already</li>
              </ul>
            </li>
            <li>
              Handoff = <strong>HO</strong>
              <ul className={secondaryListStyle}>
                <li>Handoff with no dribble</li>
              </ul>
            </li>
            <li>
              Isolation = <strong>ISO</strong>
              <ul className={secondaryListStyle}>
                <li>1 v 1 in the half court</li>
              </ul>
            </li>
            <li>
              Off-ball Screen = <strong>OBS</strong>
              <ul className={secondaryListStyle}>
                <li>Screen away from the ball</li>
              </ul>
            </li>

            <li>
              Pass = <strong>PASS</strong>
              <ul className={secondaryListStyle}>
                <li>Attack movement directly off of the pass</li>
              </ul>
            </li>

            <li>
              Pick and Roll =<strong> PNR</strong>
              <ul className={secondaryListStyle}>
                <li>Screen set for the ball handler</li>
              </ul>
            </li>

            <li>
              Rebound = <strong>REB</strong>
              <ul className={secondaryListStyle}>
                <li>Grabbing the ball off of a missed shot</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className={sectionClasses}>
        <h2 className={sectionTitleClasses}>Initial Direction</h2>
        <div className={contentClasses}>
          <ul className={mainListStyle}>
            <li>
              {" "}
              <strong>0 - No dribble</strong>{" "}
            </li>
            <li>
              <strong>1 (Pound Dribble)</strong>
              <ul className={secondaryListStyle}>
                <li>1L - Pound dribble left</li>
                <li>1R - Pound dribble right</li>
              </ul>
            </li>
            <li>
              <strong>2 (Crossover)</strong>
              <ul className={secondaryListStyle}>
                <li>2L - Crossover going left</li>
                <li>2R - Crossover going right</li>
              </ul>
            </li>
            <li>
              <strong>3 (In and Out)</strong>
              <ul className={secondaryListStyle}>
                <li>3L - In and Out left</li>
                <li>3R - In and Out right</li>
              </ul>
            </li>
            <li>
              <strong>4 ((in)-Between the legs)</strong>
              <ul className={secondaryListStyle}>
                <li>4L - Between the legs left</li>
                <li>4R - Between the legs right</li>
              </ul>
            </li>
            <li>
              <strong> 5 (Behind the back)</strong>
              <ul className={secondaryListStyle}>
                <li>5L - Behind the back left</li>
                <li>5R - Behind the back right</li>
              </ul>
            </li>
            <li>
              <strong> 6 (Half spin)</strong>
              <ul className={secondaryListStyle}>
                <li>6L - Half spin to the left</li>
                <li>6R - Half spin to the right</li>
              </ul>
            </li>
            <li>
              <strong>7 (Full Spin)</strong>
              <ul className={secondaryListStyle}>
                <li>7L - Full spin left</li>
                <li>7R - Full spin right</li>
              </ul>
            </li>
            <li>
              <strong>S (Straight)</strong>
              <ul className={secondaryListStyle}>
                <li>1S - straight pound</li>
                <li>2S - straight crossover</li>
                <li>3S - straight in and out</li>
                <li>4S - straight between the legs</li>
                <li>5S - straight behind the back</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className={sectionClasses}>
        <h2 className={sectionTitleClasses}>Counter Direction</h2>
        <ul className={mainListStyle}>
          <li>
            Same Language (Symbols) as <strong>Initial Direction</strong>{" "}
          </li>
          <li>
            The player <strong>MUST change</strong> to go the <strong>opposite direction</strong>{" "}
          </li>
        </ul>
      </div>

      <div className={sectionClasses}>
        <h2 className={sectionTitleClasses}>Last Dribble</h2>
        <ul className={mainListStyle}>
          <li>
            Same Language (Symbols) as <strong>Counter Direction and Initial Direction</strong>{" "}
          </li>
        </ul>
      </div>

      <div className={sectionClasses}>
        <h2 className={sectionTitleClasses}>Lanes %</h2>
        <div className={contentClasses}>
          <ul className={mainListStyle}>
            <li>
              <strong>Left Lane</strong> - From (paint) <strong>left lane line</strong> to the{" "}
              <strong>left sideline</strong> from baseline to the opposite baseline
            </li>
            <li>
              <strong>Right Lane</strong> - From (paint) <strong>right lane line</strong> to the{" "}
              <strong>right sideline</strong> from baseline to the opposite baseline
            </li>
            <li>
              <strong>Center</strong> - From (paint) <strong>one lane line</strong> to the{" "}
              <strong>other lane line</strong> from baseline to the opposite baseline
            </li>
          </ul>
        </div>
      </div>

      <div className={sectionClasses}>
        <h2 className={sectionTitleClasses}>Pick and Roll (PNR) Reads</h2>
        <div className={contentClasses}>
          <ul className={secondaryListStyle}>
            <li>Defenses Reaction to PNR</li>
          </ul>
          <ul className={mainListStyle}>
            <li>
              Blitz = <strong>BLTZ</strong>
              <ul className={secondaryListStyle}>
                <li>Both screener and ball handler defenders jump the ball handler</li>
                <li>Wants to force the ball handler to pass the ball</li>
              </ul>
            </li>
            <li>
              Drop = <strong>DRP</strong> - The screener’s defender sits off of screen action
            </li>
            <li>
              Hard Hedge = <strong>HH</strong> - The screener’s defender moves up on-screen action to prevent the ball
              handler from getting around the screen
            </li>
            <li>
              Ice = <strong>ICE</strong> - The screener’s defender forces the ball handler to go in whichever direction
              they want
            </li>
            <li>
              Push = <strong>PSH</strong> - The screener’s defender pushes into screen action to allow the ball
              handler’s defender to go under the screen action
            </li>
            <li>
              Soft Hedge = <strong>SH</strong> - The screener’s defender is right next to the screen, but below the line
              of the ball (not as aggressive as a hard hedge)
            </li>
            <li>
              Switch = <strong>SWT</strong> - Once the screen is set the screener’s defender is now the ball handler’s
              defender and the ball handler’s defender is the screener’s defender. The defensive teammates trade who
              they’re guarding
            </li>
            <li>
              No Pick and Roll = <strong>NPNR</strong> - No ball-screen action
            </li>
          </ul>
        </div>
      </div>

      <div className={sectionClasses}>
        <h2 className={sectionTitleClasses}>Type of Shot</h2>
        <div className={contentClasses}>
          <ul className={mainListStyle}>
            <li>
              Blocked Shot = <strong>BS</strong> - The defender knocks the shot out of the air
            </li>
            <li>
              Catch and Shoot = <strong>CS2</strong> - A player catches the ball inside the 3-point line and shoots
              without dribbling
            </li>
            <li>
              Catch and Shoot = <strong>CS3</strong> - A player catches the ball behind the 3-point line and shoots
              without dribbling
            </li>
            <li>
              Dunk = <strong>DK</strong> - The player scores at the rim and hand hits the rim while throwing the ball
              into the hoop
            </li>
            <li>
              Fadeaway 2 pointer = <strong>FA2</strong> - A player jumps away from the basket (left, right, backward)
              while shooting inside the 3-point line
            </li>
            <li>
              Fadeaway 3 pointer = <strong>FA3</strong> - A player jumps away from the basket (left, right, backward)
              while shooting from behind the 3-point line
            </li>
            <li>
              Floater = <strong>FLT</strong> - Extended lay-up/shot from close, but not directly at the basket. Lofting
              the ball into the air. More of a vertical jump rather than horizontal like a runner (RU)
            </li>
            <li>
              Layup = <strong>LU</strong> - Shooting a shot right at the basket and the player&apos;s hand is near the
              rim, but not touching it
            </li>
            <li>
              Pull up 2 pointer = <strong>PU2</strong> - A player shoots off of the dribble from inside of the 3-point
              line
            </li>
            <li>
              Pull up 3 pointer = <strong>PU3</strong> - A player shoots off of the dribble from behind of the 3-point
              line
            </li>
            <li>
              Runner = <strong>RU</strong> - Similar to a floater but more of a horizontal jump from dribbling at pace
              than vertical like a floater (FLT). Extended lay-up/shot from close, but not directly at the basket.
              Lofting the ball into the air
            </li>
            <li>
              Step-back 2 = <strong>SB2</strong> - When a player gathers to shoot while simultaneously taking a step
              backward to create space for a shot inside the 3-point line
            </li>
            <li>
              Step-back 3 = <strong>SB3</strong> - When a player gathers to shoot while simultaneously taking a step
              backward to create space for a shot behind the 3-point line
            </li>
            <li>
              Side-step 2 = <strong>SS2</strong> - When a player gathers to shoot while simultaneously taking a side
              step to create space for a shot inside the 3-point line
            </li>
            <li>
              Side-step 3 = <strong>SS3</strong> - When a player gathers to shoot while simultaneously taking a side
              step to create space for a shot behind the 3-point line
            </li>
            <li>
              Turnover = <strong>TO</strong> - When the defense takes the ball from the offense
            </li>
            <li>
              Tie up = <strong>TU</strong> - An offensive and defensive players are struggling over the ball resulting
              in a jump ball
            </li>
          </ul>
        </div>
      </div>

      <div className={sectionClasses}>
        <h2 className={sectionTitleClasses}>Combos (Full and BTE)</h2>
        <div className={contentClasses}>
          <ul className={mainListStyle}>
            <li>
              Combos consist of dribble moves using BTE symbols:
              <ul className={secondaryListStyle}>
                <li>
                  1 = <strong>Pound</strong>
                </li>
                <li>
                  2 = <strong>Crossover</strong>
                </li>
                <li>
                  3 = <strong>In and Out</strong>
                </li>
                <li>
                  4 = <strong>Between the legs</strong>
                </li>
                <li>
                  5 = <strong>Behind the back</strong>
                </li>
                <li>
                  6 = <strong>Half Spin</strong>
                </li>
                <li>
                  7 = <strong>Full Spin</strong>
                </li>
              </ul>
            </li>
            <li>
              Full and BTE Combo will be charted the same, can consist of up to THREE BTE Dribble Moves before a scoring
              movement
            </li>
            <li>
              <strong>BTE Dribble 1</strong> - The <strong>FIRST</strong> BTE dribble move of the combo
            </li>
            <li>
              <strong>BTE Dribble 2</strong> - The <strong>SECOND</strong> BTE dribble move of the combo
            </li>
            <li>
              <strong>BTE Dribble 3</strong> - The <strong>THIRD</strong> BTE dribble move of the combo
            </li>
          </ul>
        </div>
      </div>

      <div className={sectionClasses}>
        <h2 className={sectionTitleClasses}>BTE Value</h2>
        <div className={contentClasses}>
          <ul className={mainListStyle}>
            <li>
              1 - Catch and Shoot Mid-Range Jumper (Any shot <strong>inside</strong> the 3-point line that&apos;s{" "}
              <strong>not</strong> at the rim. No dribbles involved. <strong>Farther</strong> than 5 feet from the
              basket)
            </li>
            <li>2 - Catch and Shoot Lay-up (No dribbles involved)</li>
            <li>3 - Catch and Shoot 3-pointer (No dribbles involved)</li>
            <li>
              5 - Off the dribble shot from the Mid-Ranger (Any shot <strong>inside</strong> the 3-point line
              that&apos;s not at the rim. <strong>Farther</strong> than 5 feet from the basket)
            </li>
            <li>
              10 - Any shots around the basket (<strong>Closer</strong> than 5 feet from the basket)
            </li>
            <li>20 - Off the Dribble 3-pointer (Shot from behind the 3-point line after dribbling)</li>
          </ul>
        </div>
      </div>

      <div className={sectionClasses}>
        <h2 className={sectionTitleClasses}>BTE Score</h2>
        <div className={contentClasses}>
          <p>The score of the BTE combo and BTE Value:</p>
          <ul className={mainListStyle}>
            <li>Add up the BTE combo</li>
            <li>Multiply the sum (the result of adding up the BTE combo) by the BTE value</li>
            <li>BTE Value is determined by if the shot is made or missed and where the shot was taken on the court</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
