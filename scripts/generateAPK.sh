#!/bin/bash
# Command line : ./script/generateAPK.sh ../Keystore oxyonzeta

echo -e "\n \033[32m Prepare to build APK file \033[0m \n"

KEYSTORE_PATH=${1}
ALIAS_NAME=$2
ZIPALIGN=$3
PROJECT_PWD=$(pwd)

if [ ! -f "${KEYSTORE_PATH}" ]
then
    echo -e "\033[33mNo Keystore detected\033[0m"
    echo "Do you want to create it ? (Y/N)"
    read result

    if [[ "$result" == "Y" || "$result" == "y" ]]
    then
        echo -e "Filename = ?"
        read filename
        if [[ ! ("$filename" == *".keystore"*) ]]
        then
            filename="${filename}.keystore"
        fi
        KEYSTORE_PATH="${filename}"

        if [[ "$ALIAS_NAME" = "" ]]
        then
            echo -e "\033[32mSpecify Alias Name please\033[0m"
            read ALIAS_NAME
        fi

        echo -e "\033[33mLaunching key generation\033[0m\n"
        keytool -genkey -v -keystore $filename -keyalg RSA -alias $ALIAS_NAME -keysize 2048 -validity 10000

    else
        # Dont want to create -> stop
        echo -e "\033[31mNo keystore -> Stop\033[0m"
        exit
    fi
else
    echo -e "\033[32mKeystore detected\033[0m"
fi

if [[ "$ALIAS_NAME" == "" ]]
then
    echo -e "\033[31mNo Alias Name -> Stop\033[0m"
    exit
fi

VERSION="debug"
echo ""
echo "Release version ? (Y/N)"
read release
if [[ "$release" == "Y" || "$release" == "y" ]]
then
    VERSION="release"
    ionic plugin rm cordova-plugin-console
fi

# Rm old files
rm -f platforms/android/build/outputs/apk/*.apk

echo -e "\n\033[33m===========================================================================\033[0m"
echo -e "\033[33m Build application started\033[0m\n"
ionic build --$VERSION android
echo -e "\n\033[33m Build application finished\033[0m"
echo -e "\033[33m===========================================================================\033[0m\n"

APK="android-debug.apk"
if [[ "$VERSION" == "release" ]]
then
    APK="android-release-unsigned.apk"

    echo -e "\n\033[33m===========================================================================\033[0m"
    echo -e "\033[33m Sign APK phase started\033[0m\n"
    jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore "$KEYSTORE_PATH" "platforms/android/build/outputs/apk/$APK" "$ALIAS_NAME"
    echo -e "\n\033[33m Sign APK phase finished\033[0m"
    echo -e "\033[33m===========================================================================\033[0m\n"
fi

if [ $# -lt 3 ]
then
    ZIPALIGN=~/android-sdk-linux/build-tools/22.0.1/zipalign
fi
echo -e "\n\033[33m===========================================================================\033[0m"
echo -e "\033[33m Optimization APK phase started\033[0m\n"
$ZIPALIGN -v 4 "platforms/android/build/outputs/apk/$APK" "platforms/android/build/outputs/apk/android-$VERSION-OK.apk"
echo -e "\n\033[33m Optimization APK phase finished\033[0m"
echo -e "\033[33m===========================================================================\033[0m\n"


if [[ "$VERSION" == "release" ]]
then
    ionic plugin add cordova-plugin-console
fi