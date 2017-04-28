#### Account Creation ####

printf "Starting to create user3"
    curl \
    --request POST \
    --data "username=user3&password=password&email=user3%40email.com&nickname=Matthew" \
    http://localhost:5001/auth/register

sleep 1

#### Login ####
printf "Logging In!\n"
    curl \
    --request POST \
    --cookie-jar ./cookies \
    --data "username=user3&password=password" \
    http://localhost:5001/auth/login
printf "\nFinished Loggin In!\n"

sleep 2
#### UPDATING USER ####
printf "\bEditing user3\n"
#### Editing User Profile ####
printf "\nuser3: Shookt! Editing Profile\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "fullName=Matthew%20Macos&status=I%20am%20looking%20for%20a%20room&cleanliness=3&sex=Male&smoker=No&hasOrg=No&gender=Iron%20Wolf&course=BS%20Computer%20Science&batch=2013&birthday='12-14-1996'&contactNumber=09123456789&bio=Bio%20here&nickname=matthew&email=user3%40gmail.com" \
    http://localhost:5001/api/profile
sleep 0.5

#### Editing User Preferences ####
printf "\nuser3: Shookt! Inserting Utilities\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "airconditioning=Do%20not%20care&laundry=Do%20not%20care&cooking=Do%20not%20care&gasStove=Do%20not%20care&electricStove=Do%20not%20care&microwave=Do%20not%20care&waterKettle=Do%20not%20care&internet=Do%20not%20care&torrent=Do%20not%20care&speedRequirement=1.5" \
    http://localhost:5001/api/preferences/utilities
sleep 0.5

printf "\nuser3: Shookt! Inserting When\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "duration=End%20of%20semester&startDate=2014-04-28" \
    http://localhost:5001/api/preferences/when
sleep 0.5

printf "\nuser3: Shookt! Inserting Cost\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "rentPriceRangeStart=1200&rentPriceRangeEnd=2500&shouldIncludeUtilities=Yes&utilitiesPriceRangeStart=500&utilitiesPriceRangeEnd=2000" \
    http://localhost:5001/api/preferences/cost
sleep 0.5

printf "\nuser3: Shookt! Inserting Sex\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "sex=Male" \
    http://localhost:5001/api/preferences/sex
sleep 0.5

printf "\nuser3: Shookt! Inserting Misc\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "curfew=No&curfewTime=22:00:00&message=Some%20asdasdrandom%20message%20here%20makes%20these%20things%20awesome" \
    http://localhost:5001/api/preferences/misc
sleep 0.5


printf "\nuser3: Shookt! Inserting Location\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "nearbyRestaurants=No&travelTimeToUplb=20&generalLocation=Dema" \
    http://localhost:5001/api/preferences/location
sleep 0.5


printf "\nuser3: Shookt! Inserting Lifestyle\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "alcohol=Do%20not%20care&cleanliness=7&smokers=Do%20not%20care&studyTime=Do%20not%20care&guestsInRoom=Do%20not%20care&guestsStudyArea=Do%20not%20care&pets=Do%20not%20care" \
    http://localhost:5001/api/preferences/lifestyle
sleep 0.5

printf "\nuser3: Fnished! Logging out!\n";

#### Logout ####
    curl \
    --request POST \
    --cookie ./cookies \
    http://localhost:5001/auth/logout
printf "\nuser3: Fnished!\n\n";
sleep 0.5

