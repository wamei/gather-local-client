on appIsRunning(appName)
	tell application "System Events" to (name of processes) contains appName
end appIsRunning

on titleIsMatchAmazonMusic(title)
  set titleList to {"Amazon Music"}
  repeat with t in titleList
    if title contains t then
      return true
    end if
  end repeat
  return false
end titleIsMatchAmazonMusic
set checkAmazonMusicScript to "!!document.querySelector('music-horizontal-item[button-variant=\"primary\"]')"
set nowPlayingAmazonMusicScript to "JSON.stringify({title:document.querySelector('music-horizontal-item[button-variant=\"primary\"]')?.getAttribute('primary-text')??'',artist:document.querySelector('music-horizontal-item[button-variant=\"primary\"]')?.getAttribute('secondary-text')??'',isPlaying:!!document.querySelector('music-button[icon-name=\"pause\"]')})"

if appIsRunning("Google Chrome Canary") then
  tell application "Google Chrome Canary"
    repeat with t in tabs of windows
      tell t
        if my titleIsMatchAmazonMusic(title) then
          execute javascript checkAmazonMusicScript
          if result is true then
            return execute javascript nowPlayingAmazonMusicScript
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
        if my titleIsMatchAmazonMusic(title) then
          execute javascript checkAmazonMusicScript
          if result is true then
            return execute javascript nowPlayingAmazonMusicScript
          end if
        end if
      end tell
    end repeat
  end tell
end if

return "{\"title\":\"\",\"artist\":\"\",\"isPlaying\":false}"