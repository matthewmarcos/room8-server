#### Account Creation ####

printf "Starting to create usera"
    curl \
    --request POST \
    --data "username=usera&password=password&email=usera%40email.com&nickname=Matthew" \
    http://localhost:5001/auth/register

sleep 1

#### Login ####
printf "Logging In!\n"
    curl \
    --request POST \
    --cookie-jar ./cookies \
    --data "username=usera&password=password" \
    http://localhost:5001/auth/login
printf "\nFinished Loggin In!\n"

sleep 2
#### UPDATING USER ####
printf "\bEditing usera\n"
#### Editing User Profile ####
printf "\nusera: Shookt! Editing Profile\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "fullName=Matthew%20Macos&status=I%20have%20a%20room&cleanliness=7&sex=Male&smoker=No&hasOrg=No&gender=Iron%20Wolf&course=BS%20Computer%20Science&batch=2013&birthday='12-14-1996'&contactNumber=09123456789&bio=Bio%20here&nickname=matthew&email=usera%40gmail.com" \
    http://localhost:5001/api/profile
sleep 0.5

#### Editing User Preferences ####
printf "\nusera: Shookt! Inserting Utilities\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "airconditioning=Yes&laundry=No&cooking=No&gasStove=No&electricStove=No&microwave=No&waterKettle=Yes&internet=Yes&torrent=Yes&speedRequirement=1.1" \
    http://localhost:5001/api/preferences/utilities
sleep 0.5

printf "\nusera: Shookt! Inserting When\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "startDate='2014-04-29'&duration=End%20of%20semester" \
    http://localhost:5001/api/preferences/when
sleep 0.5

printf "\nusera: Shookt! Inserting Cost\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "rentPriceRangeStart=3500&rentPriceRangeEnd=0&shouldIncludeUtilities=No&utilitiesPriceRangeStart=300&utilitiesPriceRangeEnd=1000" \
    http://localhost:5001/api/preferences/cost
sleep 0.5

printf "\nusera: Shookt! Inserting Sex\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "sex=Male" \
    http://localhost:5001/api/preferences/sex
sleep 0.5

printf "\nusera: Shookt! Inserting Misc\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "curfew=No&message=message%20here&curfewTime=23%3A00%3A00" \
    http://localhost:5001/api/preferences/misc
sleep 0.5


printf "\nusera: Shookt! Inserting Location\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "nearbyRestaurants=Yes&travelTimeToUplb=11&generalLocation=Demarces" \
    http://localhost:5001/api/preferences/location
sleep 0.5


printf "\nusera: Shookt! Inserting Lifestyle\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "alcohol=No&cleanliness=10&smokers=No&studyTime=Both&guestsInRoom=No&guestsStudyArea=Yes&pets=Yes&org=Do%20not%20care" \
    http://localhost:5001/api/preferences/lifestyle
sleep 0.5

printf "\nusera: Fnished! Logging out!\n";

#### Logout ####
    curl \
    --request POST \
    --cookie ./cookies \
    http://localhost:5001/auth/logout
printf "\nusera: Fnished!\n\n";
sleep 0.5

