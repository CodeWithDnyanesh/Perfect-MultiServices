FROM node:22-alpine AS web-build
WORKDIR /app/PerfectMultiServices.Web
COPY PerfectMultiServices.Web/package*.json ./
RUN npm ci
COPY PerfectMultiServices.Web/ ./
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS api-build
WORKDIR /src
COPY PerfectMultiServices.API/PerfectMultiServices.API.csproj PerfectMultiServices.API/
RUN dotnet restore PerfectMultiServices.API/PerfectMultiServices.API.csproj
COPY PerfectMultiServices.API/ PerfectMultiServices.API/
RUN dotnet publish PerfectMultiServices.API/PerfectMultiServices.API.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=api-build /app/publish ./
COPY --from=web-build /app/PerfectMultiServices.Web/dist/PerfectMultiServices.Web/browser ./wwwroot
ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000
ENTRYPOINT ["dotnet", "PerfectMultiServices.API.dll"]
