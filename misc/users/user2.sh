#### Account Creation ####

printf "Starting to create user2"
    curl \
    --request POST \
    --data "username=user2&password=password&email=user2%40email.com&nickname=Matthew" \
    http://localhost:5001/auth/register

sleep 1

#### Login ####
printf "Logging In!\n"
    curl \
    --request POST \
    --cookie-jar ./cookies \
    --data "username=user2&password=password" \
    http://localhost:5001/auth/login
printf "\nFinished Loggin In!\n"

sleep 2
#### UPDATING USER ####
printf "\bEditing user2\n"
#### Editing User Profile ####
printf "\nuser2: Shookt! Editing Profile\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "fullName=Matthew%20Macos&status=I%20am%20looking%20for%20a%20room&cleanliness=3&sex=Female&smoker=Yes&hasOrg=Yes&gender=Iron%20Wolf&course=BS%20Computer%20Science&batch=2013&birthday='12-14-1996'&contactNumber=09123456789&bio=Bio%20here&nickname=matthew&email=user2%40gmail.com" \
    http://localhost:5001/api/profile
sleep 0.5

#### Editing User Preferences ####
printf "\nuser2: Shookt! Inserting Utilities\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "airconditioning=Yes&laundry=Yes&cooking=Yes&gasStove=Yes&electricStove=Yes&microwave=Yes&waterKettle=Yes&internet=Yes&torrent=Yes&speedRequirement=3" \
    http://localhost:5001/api/preferences/utilities
sleep 0.5

printf "\nuser2: Shookt! Inserting When\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "duration=End%20of%20semester&startDate=2014-04-30" \
    http://localhost:5001/api/preferences/when
sleep 0.5

printf "\nuser2: Shookt! Inserting Cost\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "rentPriceRangeStart=2000&rentPriceRangeEnd=5000&shouldIncludeUtilities=No&utilitiesPriceRangeStart=500&utilitiesPriceRangeEnd=2000" \
    http://localhost:5001/api/preferences/cost
sleep 0.5

printf "\nuser2: Shookt! Inserting Sex\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "sex=Female" \
    http://localhost:5001/api/preferences/sex
sleep 0.5

printf "\nuser2: Shookt! Inserting Misc\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "curfew=Yes&curfewTime=22:00:00&message=Some%20asdasdrandom%20message%20here%20makes%20these%20things%20awesome" \
    http://localhost:5001/api/preferences/misc
sleep 0.5


printf "\nuser2: Shookt! Inserting Location\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "nearbyRestaurants=Do%20not%20care&travelTimeToUplb=10&generalLocation=Dema" \
    http://localhost:5001/api/preferences/location
sleep 0.5


printf "\nuser2: Shookt! Inserting Lifestyle\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "alcohol=Yes&cleanliness=10&smokers=Yes&studyTime=Evening&guestsInRoom=Yes&guestsStudyArea=No&pets=No" \
    http://localhost:5001/api/preferences/lifestyle
sleep 0.5

printf "\nuser2: Fnished! Logging out!\n";

#### Logout ####
    curl \
    --request POST \
    --cookie ./cookies \
    http://localhost:5001/auth/logout
printf "\nuser2: Fnished!\n\n";
sleep 0.5

