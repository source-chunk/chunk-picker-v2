const modalContents = {
    'manualTasksModal': `
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeManualAdd()"></i>
        <div class='challenge-title'>
            <input type="text" placeholder="Filter tasks..." id="searchManual" class="noscrollhard"
                oninput="searchManualTasks()" autocomplete="off" />
            <span><input type="checkbox" onclick="changeFilterBy()" />Show checked only</span>
        </div>
        <div id="challenge-data" class="challenge-data noscroll"></div>
    `,
    'challengeDetailsModal': `
        <span class="details-back"></span>
        <div class="topbar noscroll">
            <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeChallengeDetails()"></i>
        </div>
        <div id="details-title" class="details-title noscroll"></div>
        <div id="details-data" class="details-data noscroll"></div>
    `,
    'backlogNotesModal': `
        <div id="notes-title" class="notes-title noscroll"></div>
        <div id="notes-data" class="notes-data noscroll"></div>
        <div id="notes-footer" class="notes-footer noscroll">
            <button id='submit-notes-button' class='modal-button' onclick='submitNotes()'>Backlog</button>
            <span id='cancel-notes-button' onclick='closeChallengeNotes()'>Cancel</span>
        </div>
    `,
    'rulesModal': `
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeRules()"></i>
        <div id="rules-title" class="rules-title noscroll">Chunk Rules</div>
        <div id="rules-subtitle" class="rules-subtitle noscroll">Pick and choose how you want to shape *your* <b>Chunk Experience</b>. Select rules to define what tasks you want to see, how those tasks are generated, and other special rulings.</div>
        <div id="rules-data" class="rules-data noscroll">
            <div id="rules-subdata" class="rules-subdata noscroll"></div>
            <div id='rulesvisibletasks' class='accordion' onclick="toggleRulesPanel('visibletasks')"><span class='exp'><i
                class="acc pic fa-solid fa-plus"></i></span><span class="accordion-title">Visible Tasks</span></div>
            <div class="panel panel-visibletasks"></div>
            <div id='rulesoverallskill' class='accordion' onclick="toggleRulesPanel('overallskill')"><span class='exp'><i
                class="acc pic fa-solid fa-plus"></i></span><span class="accordion-title">Overall Skill</span></div>
            <div class="panel panel-overallskill"></div>
            <div id='rulesagility' class='accordion' onclick="toggleRulesPanel('agility')"><span class='exp'><i
                class="acc pic fa-solid fa-plus"></i></span><span class="accordion-title">Agility</span></div>
            <div class="panel panel-agility"></div>
            <div id='rulescombat' class='accordion' onclick="toggleRulesPanel('combat')"><span class='exp'><i
                class="acc pic fa-solid fa-plus"></i></span><span class="accordion-title">Combat</span></div>
            <div class="panel panel-combat"></div>
            <div id='rulesconstruction' class='accordion' onclick="toggleRulesPanel('construction')"><span class='exp'><i
                class="acc pic fa-solid fa-plus"></i></span><span class="accordion-title">Construction</span></div>
            <div class="panel panel-construction"></div>
            <div id='rulescooking' class='accordion' onclick="toggleRulesPanel('cooking')"><span class='exp'><i
                class="acc pic fa-solid fa-plus"></i></span><span class="accordion-title">Cooking</span></div>
            <div class="panel panel-cooking"></div>
            <div id='rulesfarming' class='accordion' onclick="toggleRulesPanel('farming')"><span class='exp'><i
                class="acc pic fa-solid fa-plus"></i></span><span class="accordion-title">Farming</span></div>
            <div class="panel panel-farming"></div>
            <div id='rulesherblore' class='accordion' onclick="toggleRulesPanel('herblore')"><span class='exp'><i
                class="acc pic fa-solid fa-plus"></i></span><span class="accordion-title">Herblore</span></div>
            <div class="panel panel-herblore"></div>
            <div id='ruleshunter' class='accordion' onclick="toggleRulesPanel('hunter')"><span class='exp'><i
                class="acc pic fa-solid fa-plus"></i></span><span class="accordion-title">Hunter</span></div>
            <div class="panel panel-hunter"></div>
            <div id='rulesmagic' class='accordion' onclick="toggleRulesPanel('magic')"><span class='exp'><i
                class="acc pic fa-solid fa-plus"></i></span><span class="accordion-title">Magic</span></div>
            <div class="panel panel-magic"></div>
            <div id='rulesmining' class='accordion' onclick="toggleRulesPanel('mining')"><span class='exp'><i
                class="acc pic fa-solid fa-plus"></i></span><span class="accordion-title">Mining</span></div>
            <div class="panel panel-mining"></div>
            <div id='rulesprayer' class='accordion' onclick="toggleRulesPanel('prayer')"><span class='exp'><i
                class="acc pic fa-solid fa-plus"></i></span><span class="accordion-title">Prayer</span></div>
            <div class="panel panel-prayer"></div>
            <div id='rulesrunecraft' class='accordion' onclick="toggleRulesPanel('runecraft')"><span class='exp'><i
                class="acc pic fa-solid fa-plus"></i></span><span class="accordion-title">Runecraft</span></div>
            <div class="panel panel-runecraft"></div>
            <div id='rulessailing' class='accordion' onclick="toggleRulesPanel('sailing')"><span class='exp'><i
                class="acc pic fa-solid fa-plus"></i></span><span class="accordion-title">Sailing</span></div>
            <div class="panel panel-sailing"></div>
            <div id='rulesslayer' class='accordion' onclick="toggleRulesPanel('slayer')"><span class='exp'><i
                class="acc pic fa-solid fa-plus"></i></span><span class="accordion-title">Slayer</span></div>
            <div class="panel panel-slayer"></div>
            <div id='rulessmithing' class='accordion' onclick="toggleRulesPanel('smithing')"><span class='exp'><i
                class="acc pic fa-solid fa-plus"></i></span><span class="accordion-title">Smithing</span></div>
            <div class="panel panel-smithing"></div>
            <div id='ruleswoodcutting' class='accordion' onclick="toggleRulesPanel('woodcutting')"><span class='exp'><i
                class="acc pic fa-solid fa-plus"></i></span><span class="accordion-title">Woodcutting</span></div>
            <div class="panel panel-woodcutting"></div>
            <div id='rulesitemsources' class='accordion' onclick="toggleRulesPanel('itemsources')"><span class='exp'><i
                class="acc pic fa-solid fa-plus"></i></span><span class="accordion-title">Item Sources</span></div>
            <div class="panel panel-itemsources"></div>
            <div id='rulesmiscellaneous' class='accordion' onclick="toggleRulesPanel('miscellaneous')"><span class='exp'><i
                class="acc pic fa-solid fa-plus"></i></span><span class="accordion-title">Miscellaneous</span></div>
            <div class="panel panel-miscellaneous"></div>
            <div class="panel panel-search"></div>
            <div class="rules-names">
                <div id='rulesvisibletasks' class='accordion-sidebar' onclick="toggleRulesPanel('visibletasks')"><span class="accordion-title">Visible Tasks</span></div>
                <div id='rulesoverallskill' class='accordion-sidebar' onclick="toggleRulesPanel('overallskill')"><span class="accordion-title">Overall Skill</span></div>
                <div id='rulesagility' class='accordion-sidebar' onclick="toggleRulesPanel('agility')"><span class="accordion-title">Agility</span></div>
                <div id='rulescombat' class='accordion-sidebar' onclick="toggleRulesPanel('combat')"><span class="accordion-title">Combat</span></div>
                <div id='rulesconstruction' class='accordion-sidebar' onclick="toggleRulesPanel('construction')"><span class="accordion-title">Construction</span></div>
                <div id='rulescooking' class='accordion-sidebar' onclick="toggleRulesPanel('cooking')"><span class="accordion-title">Cooking</span></div>
                <div id='rulesfarming' class='accordion-sidebar' onclick="toggleRulesPanel('farming')"><span class="accordion-title">Farming</span></div>
                <div id='rulesherblore' class='accordion-sidebar' onclick="toggleRulesPanel('herblore')"><span class="accordion-title">Herblore</span></div>
                <div id='ruleshunter' class='accordion-sidebar' onclick="toggleRulesPanel('hunter')"><span class="accordion-title">Hunter</span></div>
                <div id='rulesmagic' class='accordion-sidebar' onclick="toggleRulesPanel('magic')"><span class="accordion-title">Magic</span></div>
                <div id='rulesmining' class='accordion-sidebar' onclick="toggleRulesPanel('mining')"><span class="accordion-title">Mining</span></div>
                <div id='rulesprayer' class='accordion-sidebar' onclick="toggleRulesPanel('prayer')"><span class="accordion-title">Prayer</span></div>
                <div id='rulesrunecraft' class='accordion-sidebar' onclick="toggleRulesPanel('runecraft')"><span class="accordion-title">Runecraft</span></div>
                <div id='rulessailing' class='accordion-sidebar' onclick="toggleRulesPanel('sailing')"><span class="accordion-title">Sailing</span></div>
                <div id='rulesslayer' class='accordion-sidebar' onclick="toggleRulesPanel('slayer')"><span class="accordion-title">Slayer</span></div>
                <div id='rulessmithing' class='accordion-sidebar' onclick="toggleRulesPanel('smithing')"><span class="accordion-title">Smithing</span></div>
                <div id='ruleswoodcutting' class='accordion-sidebar' onclick="toggleRulesPanel('woodcutting')"><span class="accordion-title">Woodcutting</span></div>
                <div id='rulesitemsources' class='accordion-sidebar' onclick="toggleRulesPanel('itemsources')"><span class="accordion-title">Item Sources</span></div>
                <div id='rulesmiscellaneous' class='accordion-sidebar' onclick="toggleRulesPanel('miscellaneous')"><span class="accordion-title">Miscellaneous</span></div>
            </div>
            <div class="rules-content">
                <div class="panel panel-visibletasks"></div>
                <div class="panel panel-overallskill"></div>
                <div class="panel panel-agility"></div>
                <div class="panel panel-combat"></div>
                <div class="panel panel-construction"></div>
                <div class="panel panel-cooking"></div>
                <div class="panel panel-farming"></div>
                <div class="panel panel-herblore"></div>
                <div class="panel panel-hunter"></div>
                <div class="panel panel-magic"></div>
                <div class="panel panel-mining"></div>
                <div class="panel panel-prayer"></div>
                <div class="panel panel-runecraft"></div>
                <div class="panel panel-sailing"></div>
                <div class="panel panel-slayer"></div>
                <div class="panel panel-smithing"></div>
                <div class="panel panel-woodcutting"></div>
                <div class="panel panel-itemsources"></div>
                <div class="panel panel-miscellaneous"></div>
            </div>
            <div class="bottom-spacing"></div>
        </div>
    `,
    'rulesPresetModal': `
        <div id="preset-title" class="preset-title noscroll"></div>
        <div id="preset-subtitle" class="preset-subtitle noscroll">Applying this preset will overwrite any existing rules with the pre-selected rules for the <span class='specific-preset'></span> preset.<div class="preset-warn"><b>Are you sure you wish to proceed?</b></div></div>
        <div id="preset-data" class="preset-data noscroll"></div>
    `,
    'settingsModal': `
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeSettings()"></i>
        <div id="settings-title" class="settings-title noscroll">Settings</div>
        <div id="settings-data" class="settings-data noscroll"></div>
    `,
    'searchModal': `
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeSearch()"></i>
        <div id="searchchunks-title" class="searchchunks-title noscroll">Search within your chunks</div>
        <div id="searchchunks-subtitle" class="searchchunks-subtitle noscroll">Search for items, npcs, monsters, objects, and shops to see where you have access to each within your unlocked chunks. <span
            class='help2'></span></div>
        <div id="searchchunks-searchcontainer" class="searchchunks-searchcontainer noscroll">
            <input type="text" placeholder="Search name..." id="searchChunks" class="noscrollhard"
            oninput="searchWithinChunks()" autocomplete="off" />
            <span id="searchchunks-initwarning" class="searchchunks-initwarning noscroll"><i class="noscroll">*Only partial data loaded*</i></span>
        </div>
        <div id="searchchunks-data" class="searchchunks-data noscroll"></div>
    `,
    'searchDetailsModal': `
        <span class="searchdetails-back"></span>
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeSearchDetails()"></i>
        <div id="searchdetails-title" class="searchdetails-title noscroll"></div>
        <div id="searchdetails-sorter" class="searchdetails-sorter noscroll">
            Sort by
            <select id="searchdetails-sorter-dropdown" onchange="searchDetailsSorterChange()">
            <option value='Alphabetical'>Alphabetical</option>
            <option value='Droprate'>Droprate</option>
            </select>
        </div>
        <div id="searchdetails-data" class="searchdetails-data noscroll"></div>
    `,
    'highestModal': `
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeHighest()"></i>
        <div id="highest-title" class="highest-title noscroll"></div>
        <div id="highest-data" class="highest-data noscroll"></div>
    `,
    'highest2Modal': `
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeHighest2()"></i>
        <div id="highest2-title" class="highest2-title noscroll"></div>
        <div id="highest2-data" class="highest2-data noscroll"></div>
    `,
    'methodsModal': `
        <div class="methods-topbar topbar noscroll">
            <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeMethods()"></i>
        </div>
        <div id="methods-data" class="methods-data noscroll"></div>
    `,
    'manualCompleteModal': `
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeComplete()"></i>
        <div id="complete-title" class="complete-title noscroll">Are you sure?</div>
        <div id="complete-data" class="complete-data noscroll">Completing these tasks will remove them from the Active Chunk Tasks tab and move them to the Completed Tasks tab. They can be un-completed from there if needed.</div>
        <div id="complete-footer" class="complete-footer noscroll">
            <button id='submit-complete-button' class='modal-button' onclick='submitCompleteTasks()'>Yes, continue</button>
        </div>
    `,
    'addEquipmentModal': `
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeAddEquipment()"></i>
        <div id="add-equipment-title" class="add-equipment-title noscroll">Add Miscellaneous BiS Equipment</div>
        <div id="add-equipment-subtitle" class="add-equipment-subtitle noscroll">Select the miscellaneous equipment obtained from various untracked sources (clue scrolls, quest rewards, crafted/smithed, etc.) to add it to your unlocked items. <b>(Adding equipment like this is not required and is for adding items that outrank your "standard" BiS gear)</b></div>
        <div id="add-equipment-searchcontainer" class="add-equipment-searchcontainer noscroll">
            <input type="text" placeholder="Search gear..." id="searchAddEquipment" class="noscrollhard"
            oninput="searchAddEquipment()" autocomplete="off" />
            <span><input type="checkbox" onclick="changeEquipmentFilterBy()" />Show checked only</span>
        </div>
        <div id="add-equipment-data" class="add-equipment-data noscroll"></div>
    `,
    'stickerModal': `
        <div id="sticker-title" class="sticker-title noscroll">Pick a sticker for <span class='sticker-chunk noscroll'></span></div>
        <div id="sticker-data-container" class="sticker-data-container noscroll">
            <div id="sticker-notes-data" class="sticker-notes-data noscroll">
                <textarea maxlength="128" placeholder="Add notes here..."></textarea>
            </div>
            <div id="sticker-color-data" class="sticker-color-data noscroll">
                <input type="color" class="sticker-color-picker noscroll" onchange="changeCurrentStickerColor()" />
                <span class='sticker-color-picker-label noscroll'>Sticker color</span>
            </div>
            <div id="sticker-data" class="sticker-data noscroll"></div>
        </div>
        <div id="sticker-footer" class="sticker-footer noscroll">
            <button id='submit-sticker-button' class='modal-button' onclick='submitSticker()'>Save</button>
            <span id='cancel-sticker-button' onclick='closeSticker()'>Cancel</span>
        </div>
    `,
    'paintModal': `
        <div id="paint-title" class="paint-title noscroll">Pick up to four colors for <span class='paint-chunk noscroll'></span></div>
        <div id="paint-data-container" class="paint-data-container noscroll">
            <div id="paint-color-data" class="paint-color-data noscroll">Selected colors: </div>
            <div id="paint-color-data-2" class="paint-color-data-2 noscroll">None</div>
            <div id="paint-data" class="paint-data noscroll"></div>
        </div>
        <div id="paint-footer" class="paint-footer noscroll">
            <button id='submit-paint-button' class='modal-button' onclick='submitPaint()'>Save</button>
            <span id='cancel-paint-button' onclick='closePaint()'>Cancel</span>
        </div>
    `,
    'backlogSourcesModal': `
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeBacklogSources()"></i>
        <div id="backlog-sources-title" class="backlog-sources-title noscroll">Backlog Sources</div>
        <div id="backlog-sources-subtitle" class="backlog-sources-subtitle noscroll">Select the monster/object/shop/etc. you want to backlog from within your unlocked chunks.</div>
        <div id="backlog-sources-searchcontainer" class="backlog-sources-searchcontainer noscroll">
            <input type="text" placeholder="Search sources..." id="searchBacklogSources" class="noscrollhard"
            oninput="searchBacklogSources()" autocomplete="off" />
            <span><input type="checkbox" onclick="changeSourcesFilterBy()" />Show checked only</span>
        </div>
        <div id="backlog-sources-data" class="backlog-sources-data noscroll"></div>
    `,
    'chunkHistoryModal': `
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeChunkHistory()"></i>
        <div id="chunkhistory-title" class="chunkhistory-title noscroll">Chunk-roll History</div>
        <div id="chunkhistory-subtitle" class="chunkhistory-subtitle noscroll">Explore the entire list of your previously rolled chunks. Useful for helping track the order your map unlocked in or remember what chunks you unlocked last week.</div>
        <div id="chunkhistory-data" class="chunkhistory-data noscroll">
            <div class="canvas-graph-outer">
            <canvas id="canvas-graph" width=575 height=325></canvas>
            </div>
            <div class="average-rolltime-title"></div>
            <div id="chunkhistory-data-inner" class="chunkhistory-data-inner noscroll"></div>
        </div>
    `,
    'altChallengesModal': `
        <div class="topbar noscroll">
            <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeChallengeAlts()"></i>
        </div>
        <div id="alts-title" class="alts-title noscroll">Alternatives</div>
        <div id="alts-data" class="alts-data noscroll"></div>
    `,
    'manuallyAddOuterModal': `
        <div class="topbar noscroll">
            <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeOuterAdd()"></i>
        </div>
        <div id="add-title" class="add-title noscroll">Manually Add:</div>
        <div id="add-data" class="add-data noscroll">
            <div class="add-item"><span class="open-manual" onclick="openManualAdd()">Tasks</span>
            </div>
            <div class="add-item"><span class="open-monsters" onclick="openMonstersAdd()">Items/Monsters/NPCs/Objects/Shops</span>
            </div>
            <div class="add-item"><span class="open-usertasks" onclick="openUserTasks()">Custom User-Inputted Tasks</span>
            </div>
        </div>
    `,
    'manuallyAddStuffModal': `
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeMonstersAdd()"></i>
        <div id="monsters-title" class="monsters-title noscroll">Manually Add Stuff</div>
        <div id="monsters-subtitle" class="monsters-subtitle noscroll">Select the Item/Monster/NPC/Object/Shop you want to add to your chunks. Useful if your rules allow you to lure monsters/npcs from other chunks into your own, or to add items gained from clue scrolls or wandering implings.</div>
        <div id="monsters-searchcontainer" class="monsters-searchcontainer noscroll">
            <input type="text" placeholder="Search..." id="searchMonsters" class="noscrollhard"
            oninput="searchMonsters()" autocomplete="off" />
            <span><input type="checkbox" onclick="changeMonstersFilterBy()" />Show checked only</span>
        </div>
        <div id="monsters-data" class="monsters-data noscroll"></div>
    `,
    'fancyRollModal': `
        <img class='background-img-23' draggable="false" src='./Background-chunk.PNG' />
        <div class='roll-chunk-spinner'><i class="noscroll fa-solid fa-spinner fa-spin"></i></div>
        <div class="modal-content noscroll">
        <div id="roll-chunk-title" class="roll-chunk-title noscroll">Rolling your next chunk...</div>
        <div id="roll-chunk-subtitle" class="roll-chunk-subtitle noscroll"></div>
        <div id="roll-chunk-data" class="roll-chunk-data noscroll">
            <div class='roll-chunk-window-outer noscroll'>
            <div class='roll-chunk-window1 noscroll'></div>
            <div class='roll-chunk-window2 noscroll'><span class='chunk-window-child1 noscroll'></span><span class='chunk-window-child2 noscroll'></span><span class='chunk-window-child3 noscroll'></span></div>
            <div class='roll-chunk-window3 noscroll'></div>
            <div class='roll-chunk-outer noscroll'></div>
            </div>
        </div>
        <div id="roll-chunk-footer" class="roll-chunk-footer noscroll">
            <button id='submit-roll-chunk-button' class='modal-button noscroll' onclick='takeMeToChunkCanvas()'>Take me there!</button>
        </div>
        </div>
    `,
    'patchNotesModal': `
        <div id="patch-notes-title" class="patch-notes-title noscroll">Patch Notes</div>
        <div id="patch-notes-subtitle" class="patch-notes-subtitle noscroll">January 14, 2026 (6.9.12)</div>
        <div id="patch-notes-data" class="patch-notes-data noscroll">
            <div><i>Note that not every update to the Chunk Picker has a corresponding Patch Notes entry. Check out the <a class='noscroll link' href='https://github.com/source-chunk/chunk-picker-v2/commits/gh-pages/' target='_blank'>Github Repository</a> to see when the Chunk Picker was last updated.</i></div>
            <br />
            <h2 class='noscroll'>Major Changes & New Features</h2>
            <ul class='noscroll'>
                <li class='noscroll'><b>Sailing</b> - Sailing was added to Oldschool Runescape in late November, and now that update is (mostly) here in the Chunk Picker! Sailing is started via the quest Pandemonium, in Port Sarim (and is similar to how Herblore is locked fully behind Druidic Ritual).<br /><br />Remember to manually add things to your map if you decide to make exceptions for Sailing! If you decide to complete the quest outside your chunks, or buy a boat, or anything like that, be sure to add it to your map so that the Chunk Picker knows and can assign you the correct tasks.<br /><br />This is the largest update that OSRS has seen in its history, which is why this has taken so long, and also why there are sure to be plenty of bugs in my data for it. Please let me know if you find any issues with the new update via the Bug Report link at the bottom of the Patch Notes.</li>
                <li class='noscroll'>Some things are not yet added for Sailing, and will be added in the near future (but I wanted to get out everything that I had so far)! These things are: all parts of the Shrouded Ocean requiring an adamant helm or better to navigate (including islands), all parts of the Northern Ocean requiring an eternal brazier to navigate (including islands), and any Sea Charting tasks or rewards.</li>
                <li class='noscroll'>The world map image has been updated to re-introduce the missing map icons!</li>
                <li class='noscroll'>Although the world map was updated previously when Sailing came out, a reminder that the Tempoross chunk has moved because of the Sailing update (and you might need to manually change your map to compensate for that if you had Tempoross unlocked!)</li>
            </ul>
            <h2 class='noscroll'>Other Changes & Bug Fixes</h2>
            <ul class='noscroll'>
                <li class='noscroll'>Added a ~boss special search term to see bosses in your chunks</li>
                <li class='noscroll'>Fixed an issue with the quest steps window not populating correctly for quests with names that contain special characters</li>
                <li class='noscroll'>Fixed an issue with a Morytania Diary task requiring the wrong skill</li>
                <li class='noscroll'>Fixed an issue where crafting using dessicated pages was incorrectly boostable</li>
                <li class='noscroll'>Fixed an issue where it was assumed Konar could assign your very first Slayer task</li>
                <li class='noscroll'>Fixed an issue with a missing Rev Caves entrance</li>
                <li class='noscroll'>Fixed an issue with extra requirements on a Fossil Island Diary task</li>
                <li class='noscroll'>Fixed an issue with harvesting celastrus bark</li>
                <li class='noscroll'>Fixed the base Ali Morrisane store not being accessible to F2P</li>
                <li class='noscroll'>Fixed tasks related to equipping void not requiring the minigame chunk itself</li>
                <li class='noscroll'>Fixed an issue with a few demonbane Combat Achievement not considering demonbane spells as valid options</li>
                <li class='noscroll'>Fixed a typo with the plural of Nechryael</li>
                <li class='noscroll'>Fixed the styling of the un-complete task button to make it easier to see</li>
                <li class='noscroll'>Fixed an issue with switching to an alternative task for BiS tasks</li>
                <li class='noscroll'>Fixed the droprate for Wilderness Slayer Cave droptable drops</li>
                <li class='noscroll'>Added a way to Backlog Source the Warriors' Guild if needed (via Door#Warriors' Guild)</li>
                <li class='noscroll'>Tweaked the Easy Ardougne Diary task for traveling to Ardougne from Brimhaven to require different chunks (due to Sailing changes)</li>
                <li class='noscroll'>Fixed an issue with being able to claim harder diary rewards before completing an easier diary tier first</li>
                <li class='noscroll'>Fixed an issue with brewing tasks</li>
                <li class='noscroll'>Fixed an issue with drops from Obor's and Bryophyta's chest were considered primary incorrectly</li>
                <li class='noscroll'>Fixed another issue with alternative tasks</li>
                <li class='noscroll'>Added Skotizo as a greater demon for the "Not So Great After All" Combat Achievement</li>
                <li class='noscroll'>Fixed an issue requiring some Slayer monsters be killed without the correct equipment</li>
                <li class='noscroll'>Added a missing key (medium) drop to Rellekka guards</li>
                <li class='noscroll'>Fixed an issue with some Arandar Pass chunk sections</li>
                <li class='noscroll'>Fixed some NPC names for similarly-named NPCs</li>
                <li class='noscroll'>Fixed required chunks for Restless Ghost and The Fremennik Trials</li>
                <li class='noscroll'>Added fishing spot (cage, harpoon) in the Wilderness where dark crab fishing spots are (they are cage/harpoon spots in F2P worlds)</li>
                <li class='noscroll'>Added the Tempoross NPC to its related tasks, for ease of backlogging if needed</li>
                <li class='noscroll'>Fixed an issue with the chunk sections in the Warriors' Guild chunk</li>
                <li class='noscroll'>Fixed an issue with accessing the Cosmic Altar before Lost City quest</li>
                <li class='noscroll'>Fixed the spelling of Teoki of Ralos NPC</li>
                <li class='noscroll'>Fixed an issue with showing overlays only in unlocked chunks</li>
                <li class='noscroll'>Added missing requirements for wielding the tome of water and tome of earth</li>
                <li class='noscroll'>Fixed an issue with the tome of fire not being considered BiS</li>
                <li class='noscroll'>Fixed an issue with already obtained BiS drops when ties happen in BiS calculation</li>
                <li class='noscroll'>Adjusted the Stronghold of Security's zombie droptable to reflect the wiki</li>
                <li class='noscroll'>Fixed waterfiends being assignable as a Slayer task before partial completiong of Barbarian Training</li>
                <li class='noscroll'>Removed some talismans from the Guardians of the Rift reward shop before certain quests are completed</li>
                <li class='noscroll'>Added a missing shortcut by the Troll Arena that gave xp</li>
                <li class='noscroll'>Prevented Forestry events from giving other skilling pets (tangleroot/rocky)</li>
                <li class='noscroll'>Added a level 1 method for Farming training via bagged plant 1 (didn't add them all to prevent unecessary tasks being added)</li>
                <li class='noscroll'>Changed how drops are considered from wandering implings to always be Secondary</li>
                <li class='noscroll'>Fixed an issue with compound droprate calculation</li>
                <li class='noscroll'>Removed a small fishing net spawn in Shipwreck Cove since it is currently bugged and cannot be picked up</li>
                <li class='noscroll'>Removed a fire in Pollnivneach since it is not usable as a normal fire</li>
                <li class='noscroll'>Corrected some of the pirates in the Asgarnian Ice Dungeon to their plain variant (there are still a few non-plain variants there, though)</li>
                <li class='noscroll'>Removed Ru Merald from his previous locations in Varlamore (but his gems can still be dug up)</li>
                <li class='noscroll'>Fixed pirates in the Pirates' Hideout chunk from contributing towards tasks via their drops before they can be actually accessed</li>
                <li class='noscroll'>Fixed the skeleton variant outside the Wilderness Agility Course</li>
                <li class='noscroll'>Changed a quest step in the Porcine of Interest quest from "Investigate the cart" to "Investigate the hole"</li>
            </ul>
            <h3 class='noscroll'>As always, if you experience any issues with your map or anything wrong related to this update, please contact me on Discord at <i class='noscroll hover-copy' onclick="navigator.clipboard.writeText('whitecatblack')">whitecatblack  <i class="fa-solid fa-copy noscroll"></i></i> or submit a bug report <a class='noscroll link' href='https://docs.google.com/forms/d/e/1FAIpQLSdmSyeMPMjuDxPrDKQHbCjJe0bXQOUwPYvyTeY_mrF-UrtmCQ/viewform?usp=sf_link' target='_blank'>here</a>.</h3>
            <h4><a href='?patch-notes' target="_blank">Patch Notes Archive</a></h4>
        </div>
        <div id="patch-notes-footer" class="patch-notes-footer noscroll">
            <button id='submit-patch-notes-button' class='modal-button' onclick='dismissPatchNotes()'>Dismiss</button>
        </div>
    `,
    'questStepsModal': `
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeQuestSteps()"></i>
        <div id="quest-steps-title" class="quest-steps-title noscroll">Quest Steps</div>
        <div id="quest-steps-data" class="quest-steps-data noscroll"></div>
    `,
    'friendsListModal': `
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeFriendsList()"></i>
        <div id="friends-list-title" class="friends-list-title noscroll">Friends List</div>
        <div id="friends-list-subtitle" class="friends-list-subtitle noscroll">Keep track of your friend's chunk progress! Save other chunk maps here for quick access to them, perfect for keeping tabs on friends or content creators.</div>
        <div id="friends-list-data" class="friends-list-data noscroll"></div>
    `,
    'addFriendMapModal': `
        <div id="friends-add-title" class="friends-add-title noscroll">Add Friend's Map</div>
        <div id="friends-add-data" class="friends-add-data noscroll">
            <input class='mid-friend noscroll' spellcheck='false' placeholder='Map ID (3-4 letters)' maxlength="128" />
            <input class='name-friend noscroll' spellcheck='false' placeholder="Friend's Name/Note" />
            <span class="altsite-friend noscroll" ><input class="altsite-friend-checkbox noscroll" type="checkbox" />Is this an RS3 map?</span>
        </div>
        <div id="friends-add-footer" class="friends-add-footer noscroll">
            <button id='submit-friend-button' class='modal-button noscroll' onclick='submitFriend()' disabled>Add</button>
            <span id='cancel-friend-button' onclick='closeFriendsListAdd()'>Cancel</span>
        </div>
    `,
    'passiveLevelModal': `
        <div id="passive-skill-title" class="passive-skill-title noscroll">Edit Passive Leveling/Highest Task</div>
        <div class="passive-skill-container">
            <div id="passive-skill-subtitle" class="passive-skill-subtitle noscroll">Enter the level passively reached in <span class='noscroll passive-skill-name'></span> (through lamps/Tears of Guthix/quest rewards/etc). Defining a passive skill this way will show Chunk Tasks for the skill up to your passively trained level, and will show Tasks for higher levels if you unlock a consistent training method.</div>
            <div id="passive-skill-input-container" class="passive-skill-input-container noscroll">Current <span class='noscroll passive-skill-name'></span> Level: <input id="passive-skill-input" type="number" min="0" max="99" oninput="passiveLockedChange()" autocomplete="off"/></div>
            <div id="passive-skill-subtitle2" class="passive-skill-subtitle2 noscroll"><b class="noscroll">[Meme Grind Limiter]</b> Use this to set a maximum level for tasks in <span class='noscroll passive-skill-name'></span>. Useful to turn meme grinds into a reasonable challenge without backlogging them. Entering a number lower than 99 will artificially stop the Chunk Picker from showing skill tasks for this skill above the inputted level.</div>
            <div id="passive-skill-input-container2" class="passive-skill-input-container2 noscroll">Highest <span class='noscroll passive-skill-name'></span> task allowed: <input id="max-skill-input" type="number" min="0" max="99" oninput="passiveLockedChange()" autocomplete="off"/></div>
        </div>
        <div id="passive-skill-data" class="passive-skill-data noscroll"></div>
    `,
    'introModal': `
        <div id="intro-title" class="intro-title noscroll">Welcome to your map!</div>
        <div id="intro-data-container" class="intro-data-container noscroll">
            <div id="intro-data-1" class="intro-data-1 noscroll">
            <div id="intro-data-main-title" class="intro-data-main-title noscroll">Take some time to set up some settings for your map before you hop into it!</div>
            <hr class="splitter noscroll" />
            <div id="intro-data-title" class="intro-data-title noscroll">Chunk Rolling Method</div>
            <div id="intro-data-subtitle" class="intro-data-subtitle noscroll">
                <div id="intro-data-subtitle" class="intro-data-subtitle noscroll">Roll 1 is the traditional method of rolling 1 random chunk as your next chunk. Roll 2 is an alternative way to roll, where 2 options are rolled randomly instead of 1, and then you pick which of those 2 to unlock! Roll 2 will let you influence your rolls slightly, but will still result in difficult rolls.</div>
                <div class="switch-field-outer noscroll">
                <div class="switch-field noscroll">
                    <input type="radio" id="radio-one" name="switch-one" value="roll1" onclick="handleRoll(this);" />
                    <label for="radio-one">Roll 1</label>
                    <input type="radio" id="radio-two" name="switch-one" value="roll2" onclick="handleRoll(this);" />
                    <label for="radio-two">Roll 2</label>
                </div>
                </div>
            </div>
            <hr class="splitter noscroll" />
            <div id="intro-data-title" class="intro-data-title noscroll">Chunk Rolling Style</div>
            <div id="intro-data-subtitle" class="intro-data-subtitle noscroll">
                <div id="intro-data-subtitle" class="intro-data-subtitle noscroll">Basic Rolling is the standard roll animation: no frills and quick. Fancy Rolling adds some flair to the roll, and builds suspense.</div>
                <div class="switch-field-outer noscroll">
                <div class="switch-field noscroll">
                    <input type="radio" id="radio-three" name="switch-two" value="basic" onclick="handleFancy(this);" />
                    <label for="radio-three">Basic Rolling</label>
                    <input type="radio" id="radio-four" name="switch-two" value="fancy" onclick="handleFancy(this);" />
                    <label for="radio-four">Fancy Rolling</label>
                </div>
                </div>
            </div>
            <hr class="splitter noscroll" />
            <div id="intro-data-title" class="intro-data-title noscroll">Color Scheme</div>
            <div id="intro-data-subtitle" class="intro-data-subtitle noscroll">
                <div class="switch-field-outer noscroll">
                <div class="switch-field noscroll">
                    <input type="radio" id="radio-five" name="switch-three" value="light" onclick="handleDark(this);" />
                    <label for="radio-five">Light Mode</label>
                    <input type="radio" id="radio-six" name="switch-three" value="dark" onclick="handleDark(this);" />
                    <label for="radio-six">Dark Mode</label>
                </div>
                </div>
            </div>
            <hr class="splitter noscroll" />
            <div id="intro-data-subtitle" class="intro-data-subtitle noscroll">Don't worry too much about your decisions, you can always change these settings via the settings menu in the top-right of the screen.</div>
            </div>
            <div id="intro-data-2" class="intro-data-2 noscroll">
            <div id="intro-data-subtitle" class="intro-data-subtitle noscroll">Feeling overwhelmed, or not quite sure how to set up your map? <b>Check out the <a href='https://github.com/source-chunk/chunk-picker-v2/wiki/Getting-Started' target='_blank'>Getting Started Guide!</a></b></div>
            <hr />
            <div id="intro-data-title" class="intro-data-title noscroll">Starting Chunk</div>
            <div id="intro-data-subtitle" class="intro-data-subtitle noscroll">
                <div id="intro-data-subtitle" class="intro-data-subtitle noscroll">Enter in the chunk ID of your starting chunk. This ID can be found in RuneLite, via the world map with the Region Locker plugin installed. (4 or 5 digits long)</div>
                <div id="intro-data-subtitle" class="intro-data-subtitle noscroll"><b class="noscroll">If you haven't decided on your starting chunk yet, you can enter 0000 instead to skip this step; you'll be reminded next time you log in to set it again.</b></div>
                <div id="intro-data-subtitle" class="intro-data-subtitle noscroll">(The standard Lumbridge starting chunk is 12850)</div>
                <input id="starting-chunk-input" class="noscroll" oninput="checkStartingChunkFormat()" placeholder="Chunk ID" autocomplete="off" />
                <div id="intro-data-subtitle" class="intro-data-subtitle noscroll">If you ever need to change your starting chunk for whatever reason, you can do so via the settings menu in the top-right of the screen.</div>
            </div>
            </div>
        </div>
        <div id="intro-footer" class="intro-footer noscroll">
            <button id='submit-intro-button' class='modal-button' onclick='nextIntroPage()' disabled>Next</button>
            <span id='cancel-intro-button' onclick='previousIntroPage()'>Back</span>
        </div>
    `,
    'xpRewardModal': `
        <div id="xp-reward-title" class="xp-reward-title noscroll">XP Reward</div>
        <div id="xp-reward-data-container" class="xp-reward-data-container noscroll">
            <div id="xp-reward-data" class="xp-reward-data noscroll"></div>
        </div>
        <div id="xp-reward-footer" class="xp-reward-footer noscroll">
            <button id='submit-xp-reward-button' class='modal-button' onclick='openXpRewardModal()'>Save</button>
            <span id='cancel-xp-reward-button' onclick='closeXpRewardModal()'>Cancel</span>
        </div>
    `,
    'manualAreasModal': `
        <div id="manual-areas-title" class="manual-areas-title noscroll">Accessible Areas</div>
        <div id="manual-areas-searchcontainer" class="manual-areas-searchcontainer noscroll">
            <input type="text" placeholder="Filter..." id="searchManualAreas" class="noscrollhard"
            oninput="searchManualAreas()" autocomplete="new-password" />
            <span><input class="changeManualAreasFilterBy" type="checkbox" onclick="changeManualAreasFilterBy()" />Show unlocked only</span>
        </div>
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeManualAreas()"></i>
        <div id="manual-areas-data" class="manual-areas-data noscroll"></div>
    `,
    'slayerMasterInfoModal': `
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeSlayerMasterInfo()"></i>
        <div id="slayermasterinfo-title" class="slayermasterinfo-title noscroll"></div>
        <div id="slayermasterinfo-subtitle" class="slayermasterinfo-subtitle noscroll"></div>
        <div id="slayermasterinfo-data" class="slayermasterinfo-data noscroll"></div>
    `,
    'doableClueStepsModal': `
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeDoableClueSteps()"></i>
        <div id="doablecluesteps-title" class="doablecluesteps-title noscroll"></div>
        <div id="doablecluesteps-subtitle" class="doablecluesteps-subtitle noscroll"></div>
        <div id="doablecluesteps-data" class="doablecluesteps-data noscroll"></div>
    `,
    'clueChunksModal': `
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeClueChunks()"></i>
        <div id="cluechunks-title" class="cluechunks-title noscroll"></div>
        <div id="cluechunks-subtitle" class="cluechunks-subtitle noscroll"></div>
        <div id="cluechunks-data" class="cluechunks-data noscroll"></div>
    `,
    'chunkNotesModal': `
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeChunkNotes()"></i>
        <div id="chunk-notes-title" class="chunk-notes-title noscroll">Notes <span class="markdown-sub-title">Supports <a href='https://www.markdownguide.org/basic-syntax/' target='_blank'>Markdown</a></span></div>
        <div id="chunk-notes-data" class="chunk-notes-data noscroll">
            <textarea placeholder="Add notes here..."></textarea>
            <div id="chunk-notes-markdown-text" class="chunk-notes-markdown-text"></div>
        </div>
        <div id="chunk-notes-footer" class="chunk-notes-footer noscroll">
            <button id='save-chunk-notes-button' class='modal-button' onclick='saveChunkNotes()'>Save</button>
        </div>
    `,
    'newTasksModal': `
        <div id="new-tasks-title" class="new-tasks-title noscroll">New Chunk Tasks</div>
        <div id="new-tasks-data" class="new-tasks-data noscroll">
        </div>
        <div id="new-tasks-footer" class="new-tasks-footer noscroll">
            <button id='close-new-tasks-button' class='modal-button' onclick='closeNewTasks()'>Close</button>
        </div>
    `,
    'constructionLockModal': `
        <div id="construction-locked-title" class="construction-locked-title noscroll">Select Chunk</div>
        <div id="construction-locked-subtitle" class="construction-locked-subtitle noscroll">Select the chunk that locks your Mahogany Homes progress. You won't be shown Mahogany Homes tasks until you unlock the chunk that is blocking you.</div>
        <div id="construction-locked-dropdown-container" class="construction-locked-dropdown-container noscroll" onchange="constructionLockedChange()"><select id="construction-locked-dropdown"></select></div>
        <div id="construction-locked-data" class="construction-locked-data noscroll"></div>
    `,
    'miscellaneousActionsModal': `
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeClipboard()"></i>
        <div class="clipboard-container">
            <div id="clipboard-title" class="clipboard-title noscroll">Copy to clipboard:</div>
            <div id="clipboard-data" class="clipboard-data noscroll"><button id='chunks-clipboard-button' class='modal-button' onclick='exportFunc("chunks")'>Chunks</button><button id='tasks-clipboard-button' class='modal-button' onclick='exportFunc("tasks")'>Tasks</button><button id='rules-clipboard-button' class='modal-button' onclick='exportFunc("rules")'>Rules</button></div>
            <div id="clipboard-data-4" class="clipboard-data-6 noscroll"><button id='clues-clipboard-button' class='modal-button' onclick='exportFunc("clues")'>Doable Clue Steps (Clue Details format)</button></div>
            <div id="clipboard-data-4" class="clipboard-data-4 noscroll"><button id='equipment-clipboard-button' class='modal-button' onclick='exportFunc("equipment")'>Equipment (Bank Memory format)</button></div>
            <div id="clipboard-subtitle" class="clipboard-subtitle noscroll">For use in <a href="https://gearscape.net/calculators/best" target="_blank" >GearScape's Best Setup calculator</a></div>
            <div id="clipboard-title2" class="clipboard-title noscroll">Other Actions:</div>
            <div id="clipboard-data-2" class="clipboard-data-2 noscroll"><button id='plugin-clipboard-button' class='modal-button' onclick='exportFunc("plugin")'>Refresh Tasks</button><a href="https://github.com/nathanreidok/chunk-tasks" target="_blank" ><i class="fa-solid fa-info-circle" title="Visit the plugin on Github"></i></a></div>
            <div id="clipboard-data-3" class="clipboard-data-3 noscroll"><button id='assign-clipboard-button' class='modal-button' onclick='exportFunc("assign")'>Assign Numbers to Neighboring Chunks</button></div>
            <div id="clipboard-data-5" class="clipboard-data-5 noscroll"><button id='fullmap-clipboard-button' class='modal-button' onclick='exportFunc("fullmap")'>Download a .webp image of your full map</button></div>
        </div>
    `,
    'mapOverlaysModal': `
        <div class="topbar noscroll">
            <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeOverlays()"></i>
        </div>
        <div id="overlays-title" class="overlays-title noscroll"><span class="overlays-title-span">Map Overlays</span></div>
        <div class="overlays-title-checkbox"><input type="checkbox" onclick="changeOverlayFilterBy()" />Within unlocked chunks only</div>
        <div id="overlays-data" class="overlays-data noscroll"></div>
    `,
    'exitSandboxWarningModal': `
        <div id="exitsandbox-title" class="exitsandbox-title noscroll">Exit Sandbox Mode?</div>
        <div id="exitsandbox-subtitle" class="exitsandbox-subtitle noscroll">Exiting sandbox mode will discard all changes made while in sandbox mode.<div class="exitsandbox-warn"><b>Are you sure you wish to proceed?</b></div></div>
        <div id="exitsandbox-data" class="exitsandbox-data noscroll"><div><div class="exitsandbox-cancel" onclick="enableTestMode(true, true)">Cancel</div><div class="exitsandbox-proceed" onclick="enableTestMode(false, true)">Yes, proceed</div></div></div>
    `,
    'rollWarningModal': `
        <div id="rollwarning-title" class="rollwarning-title noscroll">Pick a chunk?</div>
        <div id="rollwarning-subtitle" class="rollwarning-subtitle noscroll"><div class="rollwarning-firsttext">This action is not reversible.</div><div class="rollwarning-warn"><b>Are you sure you wish to proceed?</b></div></div>
        <div id="rollwarning-data" class="rollwarning-data noscroll"><div><div class="rollwarning-cancel" onclick="cancelPickWarning()">Cancel</div><div class="rollwarning-proceed" onclick="pickCanvas(false, true)">Yes, proceed</div></div></div>
    `,
    'chunkSectionsModal': `
        <div id="chunk-sections-title" class="chunk-sections-title noscroll">Chunk Sections</div>
        <div id="chunk-sections-searchcontainer" class="chunk-sections-searchcontainer noscroll">
            <input type="text" placeholder="Filter..." id="searchChunkSections" class="noscrollhard"
            oninput="searchChunkSections()" autocomplete="new-password" />
        </div>
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeChunkSections()"></i>
        <div id="chunk-sections-data" class="chunk-sections-data noscroll"></div>
    `,
    'chunkSectionPickerModal': `
        <div id="chunk-section-picker-title" class="chunk-section-picker-title noscroll">Select Chunk Sections</div>
        <div id="chunk-section-picker-subtitle" class="chunk-section-picker-subtitle noscroll">
            Select the sections of the chunk you currently have access to. This helps the website be *much* more accurate at generating correct chunk tasks.
            <span class="section-help noscroll"></span>
        </div>
        <div id="chunk-section-picker-data" class="chunk-section-picker-data noscroll">
            <div class="chunk-section-picker-chunk-id noscroll"></div>
            <div class="chunk-section-picker-block-outer">
            <div class="chunk-section-picker-block">
                <div class="chunk-section-picker-container">
                <div class='chunk-section-canvas-spinner'><i class="noscroll fa-solid fa-spinner fa-spin"></i></div>
                <canvas id='chunk-section-picker-canvas' width="192" height="192"></canvas>
                </div>
                <div><input id="chunk-section-picker-selectall-btn" type="checkbox" onclick="selectAllChunkSections()">I have access to the entire chunk</input></div>
            </div>
            <div class="chunk-section-picker-block chunk-section-picker-btns"></div>
            </div>
        </div>
        <div id="chunk-section-picker-footer" class="chunk-section-picker-footer noscroll">
            <button id='save-chunk-section-picker-button' class='modal-button' onclick='saveChunkSectionPicker()'>Save</button>
        </div>
    `,
    'roll2WarningModal': `
        <div id="roll2warning-title" class="roll2warning-title noscroll">Roll 2 chunks?</div>
        <div id="roll2warning-subtitle" class="roll2warning-subtitle noscroll"><div class="roll2warning-firsttext">This action is not reversible.</div><div class="roll2warning-warn"><b>Are you sure you wish to proceed?</b></div></div>
        <div id="roll2warning-data" class="roll2warning-data noscroll"><div><div class="roll2warning-cancel" onclick="cancelRoll2Warning()">Cancel</div><div class="roll2warning-proceed" onclick="warnRoll2Chunk(false, true)">Yes, proceed</div></div></div>
    `,
    'rulesImportModal': `
        <div id="rules-import-title" class="rules-import-title noscroll">Import Rules</div>
        <div id="rules-import-subtitle" class="rules-import-subtitle noscroll">
            <div id="rules-import-input" class="rules-import-input noscroll"><input class='rules-input' placeholder='Paste rules here' /></div>
            <div class="rules-import-error">Invalid format</div>
            Importing rules will overwrite any existing rules.
            <div class="preset-warn"><b>Are you sure you wish to proceed?</b>
            </div>
        </div>
        <div id="rules-import-data" class="rules-import-data noscroll">
            <div>
            <div class="preset-cancel" onclick="applyImportRules(false)">Cancel</div><div class="preset-proceed" onclick="applyImportRules(true)">Import</div>
            </div>
        </div>
    `,
    'customizeTopbarModal': `
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeCustomizeTopbar()"></i>
        <div id="cutomize-topbar-title" class="cutomize-topbar-title noscroll">Customize Topbar</div>
        <div id="cutomize-topbar-subtitle" class="cutomize-topbar-subtitle noscroll">Customize which icons appear in the topbar at the top-right of your map. All other icons will instead appear in the cog-wheel dropdown menu.</div>
        <div id="cutomize-topbar-data" class="cutomize-topbar-data noscroll">
            <div id="cutomize-topbar-data-inner" class="cutomize-topbar-data-inner noscroll"></div>
        </div>
    `,
    'userTaskModal': `
        <div id="usertasks-title" class="usertasks-title noscroll">Create A Custom Task</div>
        <div id="usertasks-subtitle" class="usertasks-subtitle noscroll">Add a custom task to your map by defining the task type, the name of the task, and (if applicable) the skill and level of the task. Skill tasks will show in the Skill Tasks section of your Active Tasks if they are the highest level task for that skill, and Other tasks will always show in the Other Tasks section of your Active Tasks.</div>
        <div id="usertasks-body" class="usertasks-body noscroll">
            <div id="usertasks-dropdown-container" class="usertasks-dropdown-container noscroll" onchange="userTasksSkillChange()"><div>Skill:</div><select id="usertasks-skill-dropdown"></select></div>
            <div id="usertasks-level-input" class="usertasks-level-input noscroll"><div>Skill Level:</div><input class='usertasks-input' onchange="userTasksLevelChange()" type="number" value="1" min="1" max="99" disabled /></div>
            <div id="usertasks-dropdown-container" class="usertasks-dropdown-container noscroll" onchange="userTasksSkillChange()"><div>Is task boostable:</div><select id="usertasks-boost-dropdown" disabled><option value="yes">Yes</option><option value="no">No</option></select></div>
            <div id="usertasks-name-input" class="usertasks-name-input noscroll"><div>Task Name:</div><input class='usertasks-input' oninput="userTasksNameChange()" placeholder='Task Name' autocomplete="off" /></div>
        </div>
        <div id="usertasks-data" class="usertasks-data noscroll"></div>
    `,
    'userTasksListModal': `
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeUserTasksList()"></i>
        <div id="usertasks-list-data" class="usertasks-list-data noscroll"></div>
    `,
    'deleteUserTaskWarningModal': `
        <div id="usertasks-delete-title" class="usertasks-delete-title noscroll">Delete the custom task?</div>
        <div id="usertasks-delete-subtitle" class="usertasks-delete-subtitle noscroll">This action is not reversable.<div class="preset-warn"><b>Are you sure you wish to proceed?</b></div></div>
        <div id="usertasks-delete-data" class="usertasks-delete-data noscroll"><div><div class="usertasks-delete-cancel" onclick="cancelUserTaskDelete()">Cancel</div><div class="usertasks-delete-proceed" onclick="deleteUserTask()">Yes, proceed</div></div></div>
    `,
    'missingQuestModal': `
        <div id="questchunks-title" class="questchunks-title noscroll">Missing Quest</div>
        <div id="questchunks-subtitle" class="questchunks-subtitle noscroll">One of your unlocked chunks requires a quest(s) to access. Did you mean to add this quest(s) as an exception to your map?</div>
        <div id="questchunks-body" class="questchunks-body"><div id="questchunks-body-inner" class="questchunks-body-inner"></div></div>
        <div id="questchunks-data" class="questchunks-data noscroll"></div>
    `,
    'slotUpgradeModal': `
        <div id="bis-upgrades-title" class="bis-upgrades-title noscroll"><span class="bis-upgrades-slot-name"></span> Slot Upgrade Chart</div>
        <i class="manual-close pic fa-solid fa-times noscrollhard" onclick="closeBisUpgrades()"></i>
        <div id="bis-upgrades-data" class="bis-upgrades-data noscroll"></div>
    `,
};

window.modal = {
    generate(id, onMobile) {
        $(`#${id}`).remove();
        let el;
        if (id === 'fancyRollModal') {
            el = `<div id="${id}" class="modal${onMobile ? ' mobile' : ''}">${modalContents[id]}</div>`;
        } else {
            el = `<div id="${id}" class="modal${onMobile ? ' mobile' : ''}"><div class="modal-content noscroll">${modalContents[id]}</div></div>`;
        }
        $('.custom-modal').append(el);
    }
};