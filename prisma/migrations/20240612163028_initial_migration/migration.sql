-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apikeys" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "apiKeyHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revoked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "apikeys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "iso" TEXT NOT NULL,
    "iso3" TEXT NOT NULL,
    "iso_numeric" TEXT NOT NULL,
    "fips" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "capital" TEXT NOT NULL,
    "area" INTEGER NOT NULL,
    "population" INTEGER NOT NULL,
    "continent" TEXT NOT NULL,
    "tld" TEXT NOT NULL,
    "currency_code" TEXT NOT NULL,
    "currency_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "postal_code_format" TEXT NOT NULL,
    "postal_code_regex" TEXT NOT NULL,
    "languages" TEXT NOT NULL,
    "geoname_id" INTEGER NOT NULL,
    "neighbours" TEXT NOT NULL,
    "equivalent_fips_code" TEXT NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timezones" (
    "id" SERIAL NOT NULL,
    "country_code" TEXT NOT NULL,
    "time_zone_id" TEXT NOT NULL,
    "gmt_offset_jan" DOUBLE PRECISION NOT NULL,
    "dst_offset_jul" DOUBLE PRECISION NOT NULL,
    "raw_offset" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "timezones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "geonames" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "asciiname" TEXT NOT NULL,
    "alternatenames" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "feature_class" TEXT NOT NULL,
    "feature_code" TEXT NOT NULL,
    "country_code" TEXT NOT NULL,
    "cc2" TEXT NOT NULL,
    "admin1_code" TEXT NOT NULL,
    "admin2_code" TEXT NOT NULL,
    "admin3_code" TEXT NOT NULL,
    "admin4_code" TEXT NOT NULL,
    "population" INTEGER NOT NULL DEFAULT 0,
    "elevation" INTEGER NOT NULL DEFAULT 0,
    "dem" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "modification_date" TEXT NOT NULL,

    CONSTRAINT "geonames_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- CreateIndex
CREATE INDEX "sessions_token_idx" ON "sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "apikeys_apiKeyHash_key" ON "apikeys"("apiKeyHash");

-- CreateIndex
CREATE UNIQUE INDEX "countries_iso_key" ON "countries"("iso");

-- CreateIndex
CREATE UNIQUE INDEX "countries_country_key" ON "countries"("country");

-- CreateIndex
CREATE INDEX "countries_geoname_id_idx" ON "countries"("geoname_id");

-- CreateIndex
CREATE UNIQUE INDEX "timezones_country_code_key" ON "timezones"("country_code");

-- CreateIndex
CREATE UNIQUE INDEX "timezones_time_zone_id_key" ON "timezones"("time_zone_id");

-- CreateIndex
CREATE INDEX "timezones_time_zone_id_idx" ON "timezones"("time_zone_id");

-- CreateIndex
CREATE INDEX "geonames_latitude_longitude_idx" ON "geonames"("latitude", "longitude");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apikeys" ADD CONSTRAINT "apikeys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
