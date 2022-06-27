
:START
ECHO.
ECHO WARNING
ECHO Run this script ONLY if you have an problems with opening files in OS Windows.
ECHO Visual Studio Code should open files on its own without any problems, using extensions.
ECHO.
PAUSE

@REM FTYPE txtfile="C:\Windows\system32\NOTEPAD.EXE"
@REM FTYPE txtfile="%SystemDrive%\Windows\system32\NOTEPAD.EXE" "%1" %*
ASSOC .env=txtfile

@REM REG ADD "HKCU\SOFTWARE\Classes\.env" /t REG_SZ /d "env_auto_file"
@REM REG ADD "HKCU\SOFTWARE\Classes\.env" /t REG_SZ /v "Content Type" /d "text/plain"
@REM REG ADD "HKCU\SOFTWARE\Classes\.env" /t REG_SZ /v "PerceivedType" /d "text"
@REM REG ADD "HKCU\SOFTWARE\Classes\.env\OpenWithProgids" /t REG_SZ /v "VSCode.txt" /d ""

ECHO.
ECHO Done.
ECHO.
PAUSE
GOTO EOF
