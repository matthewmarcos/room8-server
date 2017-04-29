#### Account Creation ####

printf "Starting to create userb"
    curl \
    --request POST \
    --data "username=userb&password=password&email=userb%40email.com&nickname=Matthew" \
    http://localhost:5001/auth/register

sleep 1

#### Login ####
printf "Logging In!\n"
    curl \
    --request POST \
    --cookie-jar ./cookies \
    --data "username=userb&password=password" \
    http://localhost:5001/auth/login
printf "\nFinished Loggin In!\n"

sleep 2
#### UPDATING USER ####
printf "\bEditing userb\n"
#### Editing User Profile ####
printf "\nuserb: Shookt! Editing Profile\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "fullName=Matthew%20Macos&status=I%20have%20a%20room&cleanliness=6&sex=Female&smoker=No&hasOrg=Yes&gender=Iron%20Wolf&course=BS%20Computer%20Science&batch=2013&birthday='12-14-1996'&contactNumber=09123456789&bio=Bio%20here&nickname=matthew&email=userb%40gmail.com" \
    http://localhost:5001/api/profile
sleep 0.5

#### Editing User Preferences ####
printf "\nuserb: Shookt! Inserting Utilities\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "airconditioning=No&laundry=No&cooking=No&gasStove=No&electricStove=No&microwave=No&waterKettle=No&internet=No&torrent=No&speedRequirement=0" \
    http://localhost:5001/api/preferences/utilities
sleep 0.5

printf "\nuserb: Shookt! Inserting When\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "duration=End%20of%20semester&startDate=2014-04-28" \
    http://localhost:5001/api/preferences/when
sleep 0.5

printf "\nuserb: Shookt! Inserting Cost\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "rentPriceRangeStart=1500&rentPriceRangeEnd=5000&shouldIncludeUtilities=No&utilitiesPriceRangeStart=300&utilitiesPriceRangeEnd=600" \
    http://localhost:5001/api/preferences/cost
sleep 0.5

printf "\nuserb: Shookt! Inserting Sex\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "sex=Female" \
    http://localhost:5001/api/preferences/sex
sleep 0.5

printf "\nuserb: Shookt! Inserting Misc\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "curfew=Yes&curfewTime=21:00:00&message=Some%20asdasdrandom%20message%20here%20makes%20these%20things%20awesome" \
    http://localhost:5001/api/preferences/misc
sleep 0.5


printf "\nuserb: Shookt! Inserting Location\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "nearbyRestaurants=No&travelTimeToUplb=5&generalLocation=Robinsons" \
    http://localhost:5001/api/preferences/location
sleep 0.5


printf "\nuserb: Shookt! Inserting Lifestyle\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "alcohol=No&cleanliness=10&smokers=Yes&studyTime=Evening&guestsInRoom=No&guestsStudyArea=No&pets=No&org=Yes" \
    http://localhost:5001/api/preferences/lifestyle
sleep 0.5

printf "\nuserb: Fnished! Logging out!\n";

#### Logout ####
    curl \
    --request POST \
    --cookie ./cookies \
    http://localhost:5001/auth/logout
printf "\nuserb: Fnished!\n\n";
sleep 0.5

