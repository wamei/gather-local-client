on appIsRunning(appName)
	tell application "System Events" to (name of processes) contains appName
end appIsRunning

on titleIsMatch(title)
  set titleList to {"YouTube", "ニコニコ"}
  repeat with t in titleList
    if title contains t then
      return true
    end if
  end repeat
  return false
end titleIsMatch
set checkVideoTagScript to "document.querySelector('video') && !document.querySelector('video').paused;"

on titleIsMatchAmazonMusic(title)
  set titleList to {"Amazon Music"}
  repeat with t in titleList
    if title contains t then
      return true
    end if
  end repeat
  return false
end titleIsMatchAmazonMusic
set checkAmazonMusicScript to "!!document.querySelector('music-button[icon-name=\"pause\"]')"

if appIsRunning("Google Chrome Canary") then
  tell application "Google Chrome Canary"
    repeat with t in tabs of windows
      tell t
        if my titleIsMatch(title) then
          execute javascript checkVideoTagScript
          if result is true then
            return true
          end if
        end if
        if my titleIsMatchAmazonMusic(title) then
          execute javascript checkAmazonMusicScript
          if result is true then
            return true
          end if
        end if
      end tell
    end repeat
  end tell
end if

if appIsRunning("Google Chrome") then
  tell application "Google Chrome"
    repeat with t in tabs of windows
      tell t
        if my titleIsMatch(title) then
          execute javascript checkVideoTagScript
          if result is true then
            return true
          end if
        end if
        if my titleIsMatchAmazonMusic(title) then
          execute javascript checkAmazonMusicScript
          if result is true then
            return true
          end if
        end if
      end tell
    end repeat
  end tell
end if