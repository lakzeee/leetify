FROM mcr.microsoft.com/dotnet/sdk:7.0 as build
WORKDIR /app
EXPOSE 80

# copy all .csproj files and restore as distinct layers.   Use of the same COPY command
# for every dockerfile in the project to take advantage of docker caching
COPY leetify.sln leetify.sln
COPY src/QuestionService/QuestionService.csproj src/QuestionService/QuestionService.csproj
COPY src/ProgressService/ProgressService.csproj src/ProgressService/ProgressService.csproj
COPY src/UserService/UserService.csproj src/UserService/UserService.csproj
COPY src/PlanService/PlanService.csproj src/PlanService/PlanService.csproj
COPY src/GatewayService/GatewayService.csproj src/GatewayService/GatewayService.csproj

# Restore package deps
RUN dotnet restore leetify.sln

# Copy the app folders over
COPY src/UserService src/UserService
WORKDIR /app/src/UserService
RUN dotnet publish -c Release -o /app/src/out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app/src/out .
ENTRYPOINT [ "dotnet", "UserService.dll" ]