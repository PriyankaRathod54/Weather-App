# ⚡ Quick Tips - Avoiding Rate Limits

## The Problem
Free weatherstack plan = **25 requests per month**
One search = 1 request
You run out fast if not careful!

## The Solution: 4 Smart Features

### 1. 🗂️ Smart Caching
**First search for "London"** → Data cached for 1 hour
**Second search for "London"** → Uses cache (0 API calls)

✅ Same location = no extra cost

### 2. ⏱️ Auto Debounce
**You type slowly**: "L-o-n-d-o-n"
**Without debounce**: 5 API calls (letters = different requests)
**With debounce**: 1 API call (waits for you to finish)

✅ Saves accidental duplicate calls

### 3. 🚨 Smart Detection
Hit the limit?
- 🟡 Yellow warning appears
- ⏱️ Countdown shows wait time (60 seconds)
- 💡 Tips on how to reduce usage

✅ Know exactly when to wait

### 4. 💡 Helpful Messages
Clear, non-technical error messages
Suggestions for next steps

## Best Practices

### ✅ DO THIS
```
Monday: Search "London" (1 call)
        Switch to Forecast tab (0 calls - cached!)
        Switch to Historical tab (0 calls - cached!)
        Switch to Marine tab (0 calls - cached!)

Tuesday-Sunday: Keep using same city from cache
                0 API calls for entire week!
```

### ❌ DON'T DO THIS
```
Search "London" 5 times in a row
Search for 30 different cities just to browse
Type one letter at a time searching with each letter
Make new search for each data type (Current/Forecast/etc)
```

## Monthly Budget (25 Requests)

### Option A: 5 Cities, 5 Requests Each
```
January 1: Search NYC, London, Tokyo, Paris, Dubai (5 calls)
January 2-31: Just view cached data (0 calls)
Perfect for travelers!
```

### Option B: 3 Cities, Daily Monitors
```
Each morning: Check weather for 3 cities
Week 1: 7 calls (1 per day for 1 new city)
Week 2-4: Only 3 calls per week (reuse cache)
Total: ~15 calls/month
```

### Option C: Casual User
```
Search occasional cities as needed
Plan ahead
Use cache between searches
Stay under 25 easily!
```

## What's Cached?
✅ Current weather
✅ Forecasts
✅ Historical data
✅ Marine data
✅ All API responses
⏱️ Duration: 1 hour per location

## When Rate Limited
1. See ⏱️ countdown timer
2. Wait 60 seconds (auto-counts down)
3. App retries automatically
4. Read helpful tips to improve next time

## Pro Tips
- 💡 Use Quick Buttons (London, NYC, Tokyo, Paris)
- 💡 Click tabs instead of searching same city again
- 💡 Plan your searches for the month
- 💡 Reuse searches from cache
- 💡 Don't browse casually (wasted requests)
- 💡 Cache works across all tabs (view all data once)

## Need More?
- Free Plan: 25/month
- Professional Plan: 50,000+/month
- Visit: https://apilayer.com/weatherstack/pricing

## Questions?
📖 Read **RATE_LIMIT_GUIDE.md** for complete details
📖 Read **USER_GUIDE.md** for feature details

---

**Remember**: 
- One search = cached for 1 hour
- Switch tabs = no extra calls
- Plan ahead = never run out
- Wait if limited = auto-resets in 60s

✅ **You've got this!** 🎯
