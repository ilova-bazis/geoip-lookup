/**
 * Raw timezone data in CSV format.
 * 
 * Each line represents a country's timezone information.
 * 
 * Columns:
 * 1. CountryCode: ISO 3166-1 alpha-2 country code
 * 2. TimeZoneId: Timezone identifier (e.g. Africa/Abidjan)
 * 3. GMT offset 1. Jan 2024: GMT offset in hours on January 1st, 2024
 * 4. DST offset 1. Jul 2024: DST offset in hours on July 1st, 2024
 * 5. rawOffset (independant of DST): Raw offset in hours, independent of DST
 */
export const rawData = `CountryCode	TimeZoneId	GMT offset 1. Jan 2024	DST offset 1. Jul 2024	rawOffset (independant of DST)
CI	Africa/Abidjan	0.0	0.0	0.0
GH	Africa/Accra	0.0	0.0	0.0
ET	Africa/Addis_Ababa	3.0	3.0	3.0
DZ	Africa/Algiers	1.0	1.0	1.0
ER	Africa/Asmara	3.0	3.0	3.0
ML	Africa/Bamako	0.0	0.0	0.0
CF	Africa/Bangui	1.0	1.0	1.0
GM	Africa/Banjul	0.0	0.0	0.0
GW	Africa/Bissau	0.0	0.0	0.0
MW	Africa/Blantyre	2.0	2.0	2.0
CG	Africa/Brazzaville	1.0	1.0	1.0
BI	Africa/Bujumbura	2.0	2.0	2.0
EG	Africa/Cairo	2.0	3.0	2.0
MA	Africa/Casablanca	1.0	1.0	0.0
ES	Africa/Ceuta	1.0	2.0	1.0
GN	Africa/Conakry	0.0	0.0	0.0
SN	Africa/Dakar	0.0	0.0	0.0
TZ	Africa/Dar_es_Salaam	3.0	3.0	3.0
DJ	Africa/Djibouti	3.0	3.0	3.0
CM	Africa/Douala	1.0	1.0	1.0
EH	Africa/El_Aaiun	1.0	1.0	0.0
SL	Africa/Freetown	0.0	0.0	0.0
BW	Africa/Gaborone	2.0	2.0	2.0
ZW	Africa/Harare	2.0	2.0	2.0
ZA	Africa/Johannesburg	2.0	2.0	2.0
SS	Africa/Juba	2.0	2.0	2.0
UG	Africa/Kampala	3.0	3.0	3.0
SD	Africa/Khartoum	2.0	2.0	2.0
RW	Africa/Kigali	2.0	2.0	2.0
CD	Africa/Kinshasa	1.0	1.0	1.0
NG	Africa/Lagos	1.0	1.0	1.0
GA	Africa/Libreville	1.0	1.0	1.0
TG	Africa/Lome	0.0	0.0	0.0
AO	Africa/Luanda	1.0	1.0	1.0
CD	Africa/Lubumbashi	2.0	2.0	2.0
ZM	Africa/Lusaka	2.0	2.0	2.0
GQ	Africa/Malabo	1.0	1.0	1.0
MZ	Africa/Maputo	2.0	2.0	2.0
LS	Africa/Maseru	2.0	2.0	2.0
SZ	Africa/Mbabane	2.0	2.0	2.0
SO	Africa/Mogadishu	3.0	3.0	3.0
LR	Africa/Monrovia	0.0	0.0	0.0
KE	Africa/Nairobi	3.0	3.0	3.0
TD	Africa/Ndjamena	1.0	1.0	1.0
NE	Africa/Niamey	1.0	1.0	1.0
MR	Africa/Nouakchott	0.0	0.0	0.0
BF	Africa/Ouagadougou	0.0	0.0	0.0
BJ	Africa/Porto-Novo	1.0	1.0	1.0
ST	Africa/Sao_Tome	0.0	0.0	0.0
LY	Africa/Tripoli	2.0	2.0	2.0
TN	Africa/Tunis	1.0	1.0	1.0
NA	Africa/Windhoek	2.0	2.0	1.0
US	America/Adak	-10.0	-9.0	-10.0
US	America/Anchorage	-9.0	-8.0	-9.0
AI	America/Anguilla	-4.0	-4.0	-4.0
AG	America/Antigua	-4.0	-4.0	-4.0
BR	America/Araguaina	-3.0	-3.0	-3.0
AR	America/Argentina/Buenos_Aires	-3.0	-3.0	-3.0
AR	America/Argentina/Catamarca	-3.0	-3.0	-3.0
AR	America/Argentina/Cordoba	-3.0	-3.0	-3.0
AR	America/Argentina/Jujuy	-3.0	-3.0	-3.0
AR	America/Argentina/La_Rioja	-3.0	-3.0	-3.0
AR	America/Argentina/Mendoza	-3.0	-3.0	-3.0
AR	America/Argentina/Rio_Gallegos	-3.0	-3.0	-3.0
AR	America/Argentina/Salta	-3.0	-3.0	-3.0
AR	America/Argentina/San_Juan	-3.0	-3.0	-3.0
AR	America/Argentina/San_Luis	-3.0	-3.0	-3.0
AR	America/Argentina/Tucuman	-3.0	-3.0	-3.0
AR	America/Argentina/Ushuaia	-3.0	-3.0	-3.0
AW	America/Aruba	-4.0	-4.0	-4.0
PY	America/Asuncion	-3.0	-4.0	-4.0
CA	America/Atikokan	-5.0	-5.0	-5.0
BR	America/Bahia	-3.0	-3.0	-3.0
MX	America/Bahia_Banderas	-6.0	-6.0	-6.0
BB	America/Barbados	-4.0	-4.0	-4.0
BR	America/Belem	-3.0	-3.0	-3.0
BZ	America/Belize	-6.0	-6.0	-6.0
CA	America/Blanc-Sablon	-4.0	-4.0	-4.0
BR	America/Boa_Vista	-4.0	-4.0	-4.0
CO	America/Bogota	-5.0	-5.0	-5.0
US	America/Boise	-7.0	-6.0	-7.0
CA	America/Cambridge_Bay	-7.0	-6.0	-7.0
BR	America/Campo_Grande	-4.0	-4.0	-4.0
MX	America/Cancun	-5.0	-5.0	-5.0
VE	America/Caracas	-4.0	-4.0	-4.0
GF	America/Cayenne	-3.0	-3.0	-3.0
KY	America/Cayman	-5.0	-5.0	-5.0
US	America/Chicago	-6.0	-5.0	-6.0
MX	America/Chihuahua	-6.0	-6.0	-6.0
MX	America/Ciudad_Juarez	-7.0	-6.0	-7.0
CR	America/Costa_Rica	-6.0	-6.0	-6.0
CA	America/Creston	-7.0	-7.0	-7.0
BR	America/Cuiaba	-4.0	-4.0	-4.0
CW	America/Curacao	-4.0	-4.0	-4.0
GL	America/Danmarkshavn	0.0	0.0	0.0
CA	America/Dawson	-7.0	-7.0	-7.0
CA	America/Dawson_Creek	-7.0	-7.0	-7.0
US	America/Denver	-7.0	-6.0	-7.0
US	America/Detroit	-5.0	-4.0	-5.0
DM	America/Dominica	-4.0	-4.0	-4.0
CA	America/Edmonton	-7.0	-6.0	-7.0
BR	America/Eirunepe	-5.0	-5.0	-5.0
SV	America/El_Salvador	-6.0	-6.0	-6.0
CA	America/Fort_Nelson	-7.0	-7.0	-7.0
BR	America/Fortaleza	-3.0	-3.0	-3.0
CA	America/Glace_Bay	-4.0	-3.0	-4.0
CA	America/Goose_Bay	-4.0	-3.0	-4.0
TC	America/Grand_Turk	-5.0	-4.0	-5.0
GD	America/Grenada	-4.0	-4.0	-4.0
GP	America/Guadeloupe	-4.0	-4.0	-4.0
GT	America/Guatemala	-6.0	-6.0	-6.0
EC	America/Guayaquil	-5.0	-5.0	-5.0
GY	America/Guyana	-4.0	-4.0	-4.0
CA	America/Halifax	-4.0	-3.0	-4.0
CU	America/Havana	-5.0	-4.0	-5.0
MX	America/Hermosillo	-7.0	-7.0	-7.0
US	America/Indiana/Indianapolis	-5.0	-4.0	-5.0
US	America/Indiana/Knox	-6.0	-5.0	-6.0
US	America/Indiana/Marengo	-5.0	-4.0	-5.0
US	America/Indiana/Petersburg	-5.0	-4.0	-5.0
US	America/Indiana/Tell_City	-6.0	-5.0	-6.0
US	America/Indiana/Vevay	-5.0	-4.0	-5.0
US	America/Indiana/Vincennes	-5.0	-4.0	-5.0
US	America/Indiana/Winamac	-5.0	-4.0	-5.0
CA	America/Inuvik	-7.0	-6.0	-7.0
CA	America/Iqaluit	-5.0	-4.0	-5.0
JM	America/Jamaica	-5.0	-5.0	-5.0
US	America/Juneau	-9.0	-8.0	-9.0
US	America/Kentucky/Louisville	-5.0	-4.0	-5.0
US	America/Kentucky/Monticello	-5.0	-4.0	-5.0
BQ	America/Kralendijk	-4.0	-4.0	-4.0
BO	America/La_Paz	-4.0	-4.0	-4.0
PE	America/Lima	-5.0	-5.0	-5.0
US	America/Los_Angeles	-8.0	-7.0	-8.0
SX	America/Lower_Princes	-4.0	-4.0	-4.0
BR	America/Maceio	-3.0	-3.0	-3.0
NI	America/Managua	-6.0	-6.0	-6.0
BR	America/Manaus	-4.0	-4.0	-4.0
MF	America/Marigot	-4.0	-4.0	-4.0
MQ	America/Martinique	-4.0	-4.0	-4.0
MX	America/Matamoros	-6.0	-5.0	-6.0
MX	America/Mazatlan	-7.0	-7.0	-7.0
US	America/Menominee	-6.0	-5.0	-6.0
MX	America/Merida	-6.0	-6.0	-6.0
US	America/Metlakatla	-9.0	-8.0	-9.0
MX	America/Mexico_City	-6.0	-6.0	-6.0
PM	America/Miquelon	-3.0	-2.0	-3.0
CA	America/Moncton	-4.0	-3.0	-4.0
MX	America/Monterrey	-6.0	-6.0	-6.0
UY	America/Montevideo	-3.0	-3.0	-3.0
MS	America/Montserrat	-4.0	-4.0	-4.0
BS	America/Nassau	-5.0	-4.0	-5.0
US	America/New_York	-5.0	-4.0	-5.0
US	America/Nome	-9.0	-8.0	-9.0
BR	America/Noronha	-2.0	-2.0	-2.0
US	America/North_Dakota/Beulah	-6.0	-5.0	-6.0
US	America/North_Dakota/Center	-6.0	-5.0	-6.0
US	America/North_Dakota/New_Salem	-6.0	-5.0	-6.0
GL	America/Nuuk	-2.0	-1.0	-2.0
MX	America/Ojinaga	-6.0	-5.0	-6.0
PA	America/Panama	-5.0	-5.0	-5.0
SR	America/Paramaribo	-3.0	-3.0	-3.0
US	America/Phoenix	-7.0	-7.0	-7.0
HT	America/Port-au-Prince	-5.0	-4.0	-5.0
TT	America/Port_of_Spain	-4.0	-4.0	-4.0
BR	America/Porto_Velho	-4.0	-4.0	-4.0
PR	America/Puerto_Rico	-4.0	-4.0	-4.0
CL	America/Punta_Arenas	-3.0	-3.0	-3.0
CA	America/Rankin_Inlet	-6.0	-5.0	-6.0
BR	America/Recife	-3.0	-3.0	-3.0
CA	America/Regina	-6.0	-6.0	-6.0
CA	America/Resolute	-6.0	-5.0	-6.0
BR	America/Rio_Branco	-5.0	-5.0	-5.0
BR	America/Santarem	-3.0	-3.0	-3.0
CL	America/Santiago	-3.0	-4.0	-4.0
DO	America/Santo_Domingo	-4.0	-4.0	-4.0
BR	America/Sao_Paulo	-3.0	-3.0	-3.0
GL	America/Scoresbysund	-1.0	-1.0	-2.0
US	America/Sitka	-9.0	-8.0	-9.0
BL	America/St_Barthelemy	-4.0	-4.0	-4.0
CA	America/St_Johns	-3.5	-2.5	-3.5
KN	America/St_Kitts	-4.0	-4.0	-4.0
LC	America/St_Lucia	-4.0	-4.0	-4.0
VI	America/St_Thomas	-4.0	-4.0	-4.0
VC	America/St_Vincent	-4.0	-4.0	-4.0
CA	America/Swift_Current	-6.0	-6.0	-6.0
HN	America/Tegucigalpa	-6.0	-6.0	-6.0
GL	America/Thule	-4.0	-3.0	-4.0
MX	America/Tijuana	-8.0	-7.0	-8.0
CA	America/Toronto	-5.0	-4.0	-5.0
VG	America/Tortola	-4.0	-4.0	-4.0
CA	America/Vancouver	-8.0	-7.0	-8.0
CA	America/Whitehorse	-7.0	-7.0	-7.0
CA	America/Winnipeg	-6.0	-5.0	-6.0
US	America/Yakutat	-9.0	-8.0	-9.0
CA	America/Yellowknife	-7.0	-6.0	-7.0
AQ	Antarctica/Casey	8.0	8.0	8.0
AQ	Antarctica/Davis	7.0	7.0	7.0
AQ	Antarctica/DumontDUrville	10.0	10.0	10.0
AU	Antarctica/Macquarie	11.0	10.0	10.0
AQ	Antarctica/Mawson	5.0	5.0	5.0
AQ	Antarctica/McMurdo	13.0	12.0	12.0
AQ	Antarctica/Palmer	-3.0	-3.0	-3.0
AQ	Antarctica/Rothera	-3.0	-3.0	-3.0
AQ	Antarctica/Syowa	3.0	3.0	3.0
AQ	Antarctica/Troll	0.0	2.0	0.0
AQ	Antarctica/Vostok	5.0	5.0	5.0
SJ	Arctic/Longyearbyen	1.0	2.0	1.0
YE	Asia/Aden	3.0	3.0	3.0
KZ	Asia/Almaty	6.0	5.0	5.0
JO	Asia/Amman	3.0	3.0	3.0
RU	Asia/Anadyr	12.0	12.0	12.0
KZ	Asia/Aqtau	5.0	5.0	5.0
KZ	Asia/Aqtobe	5.0	5.0	5.0
TM	Asia/Ashgabat	5.0	5.0	5.0
KZ	Asia/Atyrau	5.0	5.0	5.0
IQ	Asia/Baghdad	3.0	3.0	3.0
BH	Asia/Bahrain	3.0	3.0	3.0
AZ	Asia/Baku	4.0	4.0	4.0
TH	Asia/Bangkok	7.0	7.0	7.0
RU	Asia/Barnaul	7.0	7.0	7.0
LB	Asia/Beirut	2.0	3.0	2.0
KG	Asia/Bishkek	6.0	6.0	6.0
BN	Asia/Brunei	8.0	8.0	8.0
RU	Asia/Chita	9.0	9.0	9.0
MN	Asia/Choibalsan	8.0	8.0	8.0
LK	Asia/Colombo	5.5	5.5	5.5
SY	Asia/Damascus	3.0	3.0	3.0
BD	Asia/Dhaka	6.0	6.0	6.0
TL	Asia/Dili	9.0	9.0	9.0
AE	Asia/Dubai	4.0	4.0	4.0
TJ	Asia/Dushanbe	5.0	5.0	5.0
CY	Asia/Famagusta	2.0	3.0	2.0
PS	Asia/Gaza	2.0	3.0	2.0
PS	Asia/Hebron	2.0	3.0	2.0
VN	Asia/Ho_Chi_Minh	7.0	7.0	7.0
HK	Asia/Hong_Kong	8.0	8.0	8.0
MN	Asia/Hovd	7.0	7.0	7.0
RU	Asia/Irkutsk	8.0	8.0	8.0
ID	Asia/Jakarta	7.0	7.0	7.0
ID	Asia/Jayapura	9.0	9.0	9.0
IL	Asia/Jerusalem	2.0	3.0	2.0
AF	Asia/Kabul	4.5	4.5	4.5
RU	Asia/Kamchatka	12.0	12.0	12.0
PK	Asia/Karachi	5.0	5.0	5.0
NP	Asia/Kathmandu	5.75	5.75	5.75
RU	Asia/Khandyga	9.0	9.0	9.0
IN	Asia/Kolkata	5.5	5.5	5.5
RU	Asia/Krasnoyarsk	7.0	7.0	7.0
MY	Asia/Kuala_Lumpur	8.0	8.0	8.0
MY	Asia/Kuching	8.0	8.0	8.0
KW	Asia/Kuwait	3.0	3.0	3.0
MO	Asia/Macau	8.0	8.0	8.0
RU	Asia/Magadan	11.0	11.0	11.0
ID	Asia/Makassar	8.0	8.0	8.0
PH	Asia/Manila	8.0	8.0	8.0
OM	Asia/Muscat	4.0	4.0	4.0
CY	Asia/Nicosia	2.0	3.0	2.0
RU	Asia/Novokuznetsk	7.0	7.0	7.0
RU	Asia/Novosibirsk	7.0	7.0	7.0
RU	Asia/Omsk	6.0	6.0	6.0
KZ	Asia/Oral	5.0	5.0	5.0
KH	Asia/Phnom_Penh	7.0	7.0	7.0
ID	Asia/Pontianak	7.0	7.0	7.0
KP	Asia/Pyongyang	9.0	9.0	9.0
QA	Asia/Qatar	3.0	3.0	3.0
KZ	Asia/Qostanay	6.0	5.0	5.0
KZ	Asia/Qyzylorda	5.0	5.0	5.0
SA	Asia/Riyadh	3.0	3.0	3.0
RU	Asia/Sakhalin	11.0	11.0	11.0
UZ	Asia/Samarkand	5.0	5.0	5.0
KR	Asia/Seoul	9.0	9.0	9.0
CN	Asia/Shanghai	8.0	8.0	8.0
SG	Asia/Singapore	8.0	8.0	8.0
RU	Asia/Srednekolymsk	11.0	11.0	11.0
TW	Asia/Taipei	8.0	8.0	8.0
UZ	Asia/Tashkent	5.0	5.0	5.0
GE	Asia/Tbilisi	4.0	4.0	4.0
IR	Asia/Tehran	3.5	3.5	3.5
BT	Asia/Thimphu	6.0	6.0	6.0
JP	Asia/Tokyo	9.0	9.0	9.0
RU	Asia/Tomsk	7.0	7.0	7.0
MN	Asia/Ulaanbaatar	8.0	8.0	8.0
CN	Asia/Urumqi	6.0	6.0	6.0
RU	Asia/Ust-Nera	10.0	10.0	10.0
LA	Asia/Vientiane	7.0	7.0	7.0
RU	Asia/Vladivostok	10.0	10.0	10.0
RU	Asia/Yakutsk	9.0	9.0	9.0
MM	Asia/Yangon	6.5	6.5	6.5
RU	Asia/Yekaterinburg	5.0	5.0	5.0
AM	Asia/Yerevan	4.0	4.0	4.0
PT	Atlantic/Azores	-1.0	0.0	-1.0
BM	Atlantic/Bermuda	-4.0	-3.0	-4.0
ES	Atlantic/Canary	0.0	1.0	0.0
CV	Atlantic/Cape_Verde	-1.0	-1.0	-1.0
FO	Atlantic/Faroe	0.0	1.0	0.0
PT	Atlantic/Madeira	0.0	1.0	0.0
IS	Atlantic/Reykjavik	0.0	0.0	0.0
GS	Atlantic/South_Georgia	-2.0	-2.0	-2.0
SH	Atlantic/St_Helena	0.0	0.0	0.0
FK	Atlantic/Stanley	-3.0	-3.0	-3.0
AU	Australia/Adelaide	10.5	9.5	9.5
AU	Australia/Brisbane	10.0	10.0	10.0
AU	Australia/Broken_Hill	10.5	9.5	9.5
AU	Australia/Darwin	9.5	9.5	9.5
AU	Australia/Eucla	8.75	8.75	8.75
AU	Australia/Hobart	11.0	10.0	10.0
AU	Australia/Lindeman	10.0	10.0	10.0
AU	Australia/Lord_Howe	11.0	10.5	10.5
AU	Australia/Melbourne	11.0	10.0	10.0
AU	Australia/Perth	8.0	8.0	8.0
AU	Australia/Sydney	11.0	10.0	10.0
NL	Europe/Amsterdam	1.0	2.0	1.0
AD	Europe/Andorra	1.0	2.0	1.0
RU	Europe/Astrakhan	4.0	4.0	4.0
GR	Europe/Athens	2.0	3.0	2.0
RS	Europe/Belgrade	1.0	2.0	1.0
DE	Europe/Berlin	1.0	2.0	1.0
SK	Europe/Bratislava	1.0	2.0	1.0
BE	Europe/Brussels	1.0	2.0	1.0
RO	Europe/Bucharest	2.0	3.0	2.0
HU	Europe/Budapest	1.0	2.0	1.0
DE	Europe/Busingen	1.0	2.0	1.0
MD	Europe/Chisinau	2.0	3.0	2.0
DK	Europe/Copenhagen	1.0	2.0	1.0
IE	Europe/Dublin	0.0	1.0	0.0
GI	Europe/Gibraltar	1.0	2.0	1.0
GG	Europe/Guernsey	0.0	1.0	0.0
FI	Europe/Helsinki	2.0	3.0	2.0
IM	Europe/Isle_of_Man	0.0	1.0	0.0
TR	Europe/Istanbul	3.0	3.0	3.0
JE	Europe/Jersey	0.0	1.0	0.0
RU	Europe/Kaliningrad	2.0	2.0	2.0
RU	Europe/Kirov	3.0	3.0	3.0
UA	Europe/Kyiv	2.0	3.0	2.0
PT	Europe/Lisbon	0.0	1.0	0.0
SI	Europe/Ljubljana	1.0	2.0	1.0
GB	Europe/London	0.0	1.0	0.0
LU	Europe/Luxembourg	1.0	2.0	1.0
ES	Europe/Madrid	1.0	2.0	1.0
MT	Europe/Malta	1.0	2.0	1.0
AX	Europe/Mariehamn	2.0	3.0	2.0
BY	Europe/Minsk	3.0	3.0	3.0
MC	Europe/Monaco	1.0	2.0	1.0
RU	Europe/Moscow	3.0	3.0	3.0
NO	Europe/Oslo	1.0	2.0	1.0
FR	Europe/Paris	1.0	2.0	1.0
ME	Europe/Podgorica	1.0	2.0	1.0
CZ	Europe/Prague	1.0	2.0	1.0
LV	Europe/Riga	2.0	3.0	2.0
IT	Europe/Rome	1.0	2.0	1.0
RU	Europe/Samara	4.0	4.0	4.0
SM	Europe/San_Marino	1.0	2.0	1.0
BA	Europe/Sarajevo	1.0	2.0	1.0
RU	Europe/Saratov	4.0	4.0	4.0
UA	Europe/Simferopol	3.0	3.0	3.0
MK	Europe/Skopje	1.0	2.0	1.0
BG	Europe/Sofia	2.0	3.0	2.0
SE	Europe/Stockholm	1.0	2.0	1.0
EE	Europe/Tallinn	2.0	3.0	2.0
AL	Europe/Tirane	1.0	2.0	1.0
RU	Europe/Ulyanovsk	4.0	4.0	4.0
LI	Europe/Vaduz	1.0	2.0	1.0
VA	Europe/Vatican	1.0	2.0	1.0
AT	Europe/Vienna	1.0	2.0	1.0
LT	Europe/Vilnius	2.0	3.0	2.0
RU	Europe/Volgograd	3.0	3.0	3.0
PL	Europe/Warsaw	1.0	2.0	1.0
HR	Europe/Zagreb	1.0	2.0	1.0
CH	Europe/Zurich	1.0	2.0	1.0
MG	Indian/Antananarivo	3.0	3.0	3.0
IO	Indian/Chagos	6.0	6.0	6.0
CX	Indian/Christmas	7.0	7.0	7.0
CC	Indian/Cocos	6.5	6.5	6.5
KM	Indian/Comoro	3.0	3.0	3.0
TF	Indian/Kerguelen	5.0	5.0	5.0
SC	Indian/Mahe	4.0	4.0	4.0
MV	Indian/Maldives	5.0	5.0	5.0
MU	Indian/Mauritius	4.0	4.0	4.0
YT	Indian/Mayotte	3.0	3.0	3.0
RE	Indian/Reunion	4.0	4.0	4.0
WS	Pacific/Apia	13.0	13.0	13.0
NZ	Pacific/Auckland	13.0	12.0	12.0
PG	Pacific/Bougainville	11.0	11.0	11.0
NZ	Pacific/Chatham	13.75	12.75	12.75
FM	Pacific/Chuuk	10.0	10.0	10.0
CL	Pacific/Easter	-5.0	-6.0	-6.0
VU	Pacific/Efate	11.0	11.0	11.0
TK	Pacific/Fakaofo	13.0	13.0	13.0
FJ	Pacific/Fiji	12.0	12.0	12.0
TV	Pacific/Funafuti	12.0	12.0	12.0
EC	Pacific/Galapagos	-6.0	-6.0	-6.0
PF	Pacific/Gambier	-9.0	-9.0	-9.0
SB	Pacific/Guadalcanal	11.0	11.0	11.0
GU	Pacific/Guam	10.0	10.0	10.0
US	Pacific/Honolulu	-10.0	-10.0	-10.0
KI	Pacific/Kanton	13.0	13.0	13.0
KI	Pacific/Kiritimati	14.0	14.0	14.0
FM	Pacific/Kosrae	11.0	11.0	11.0
MH	Pacific/Kwajalein	12.0	12.0	12.0
MH	Pacific/Majuro	12.0	12.0	12.0
PF	Pacific/Marquesas	-9.5	-9.5	-9.5
UM	Pacific/Midway	-11.0	-11.0	-11.0
NR	Pacific/Nauru	12.0	12.0	12.0
NU	Pacific/Niue	-11.0	-11.0	-11.0
NF	Pacific/Norfolk	12.0	11.0	11.0
NC	Pacific/Noumea	11.0	11.0	11.0
AS	Pacific/Pago_Pago	-11.0	-11.0	-11.0
PW	Pacific/Palau	9.0	9.0	9.0
PN	Pacific/Pitcairn	-8.0	-8.0	-8.0
FM	Pacific/Pohnpei	11.0	11.0	11.0
PG	Pacific/Port_Moresby	10.0	10.0	10.0
CK	Pacific/Rarotonga	-10.0	-10.0	-10.0
MP	Pacific/Saipan	10.0	10.0	10.0
PF	Pacific/Tahiti	-10.0	-10.0	-10.0
KI	Pacific/Tarawa	12.0	12.0	12.0
TO	Pacific/Tongatapu	13.0	13.0	13.0
UM	Pacific/Wake	12.0	12.0	12.0
WF	Pacific/Wallis	12.0	12.0	12.0`;
