'use strict';

const { google } = require('googleapis');
const calendar = google.calendar('v3');
const SCOPES = ['https://www.googleapis.com/auth/calendar.events.public.readonly'];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = ['https://haleytolar.github.io/meet/'];

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, redirect_uris[0]);

const defaultHeaders = {
  'Access-Control-Allow-Origin': '*', // Set the CORS headers here
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': true,
};

const handleOptionsRequest = () => {
  return {
    statusCode: 200,
    headers: defaultHeaders,
    body: JSON.stringify({}),
  };
};

const createResponse = (statusCode, body) => {
  return {
    statusCode,
    headers: defaultHeaders,
    body: JSON.stringify(body),
  };
};

module.exports.getAuthURL = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return handleOptionsRequest();
  }

  try {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    return createResponse(200, { authUrl });
  } catch (error) {
    return createResponse(500, { error: error.message });
  }
};

module.exports.getAccessToken = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return handleOptionsRequest();
  }

  const code = decodeURIComponent(event.pathParameters.code);
  try {
    const response = await oAuth2Client.getToken(code);
    return createResponse(200, response.tokens);
  } catch (error) {
    return createResponse(500, { error: error.message });
  }
};

module.exports.getCalendarEvents = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return handleOptionsRequest();
  }

  const access_token = decodeURIComponent(event.pathParameters.access_token);
  oAuth2Client.setCredentials({ access_token });
  try {
    const response = await calendar.events.list({
      calendarId: CALENDAR_ID,
      auth: oAuth2Client,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });
    return createResponse(200, { events: response.data.items });
  } catch (error) {
    return createResponse(error.code || 500, { error: error.message });
  }
};
