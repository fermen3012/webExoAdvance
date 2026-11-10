import { NextResponse } from "next/server";

const INDEXNOW_KEY = "exoadvance2026indexnowkey89a1b2c3";
const HOST = "www.exoadvancellc.com";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

const DEFAULT_URL_LIST = [
  `https://${HOST}`,
  `https://${HOST}/orderpoint`,
  `https://${HOST}/orderpoint-vs-toast`,
  `https://${HOST}/services`,
  `https://${HOST}/restaurant-technology`,
  `https://${HOST}/business-intelligence`,
  `https://${HOST}/software-development`,
  `https://${HOST}/solutions`,
  `https://${HOST}/contact`,
];

/**
 * Submits URL list to IndexNow API (Bing, Yandex, Naver, Seznam) for instant crawl notification.
 */
export async function POST(req: Request) {
  try {
    let urlsToSubmit = DEFAULT_URL_LIST;

    // Allow custom URL list via request body if provided
    try {
      const body = await req.json();
      if (body && Array.isArray(body.urls) && body.urls.length > 0) {
        urlsToSubmit = body.urls;
      }
    } catch {
      // Use defaults if body is empty or not JSON
    }

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urlsToSubmit,
    };

    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    const status = response.status;
    const isSuccess = status === 200 || status === 202;

    if (!isSuccess) {
      const errorText = await response.text();
      console.warn(`[INDEXNOW_WARN] IndexNow returned status ${status}:`, errorText);
      return NextResponse.json(
        {
          success: false,
          status,
          message: `IndexNow submission returned status ${status}`,
          details: errorText,
        },
        { status: 500 }
      );
    }

    console.log(`[INDEXNOW_SUCCESS] Successfully notified ${urlsToSubmit.length} URLs to IndexNow (Status: ${status}).`);

    return NextResponse.json({
      success: true,
      status,
      submittedUrls: urlsToSubmit,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Internal Error";
    console.error("[INDEXNOW_ERROR]", errorMsg);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}

/**
 * Quick GET handler to trigger IndexNow submission manually or via cron.
 */
export async function GET() {
  return POST(new Request("https://localhost/api/seo/indexnow", { method: "POST" }));
}
