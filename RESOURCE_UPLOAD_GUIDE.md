# Resource Upload Guide

This guide explains how to upload and manage resources in Comdeck.

## Directory Structure

Resources are stored in the `public/resources/` directory, organized by subject and resource type. Video resources use external URLs and do not require file uploads:

```
public/
  resources/
    economics/
      notes/
      short-notes/
      past-papers/
      past-paper-answers/
      provincial-papers/
      unit-papers/
      model-papers/
    ict/
      notes/
      short-notes/
      past-papers/
      past-paper-answers/
      provincial-papers/
      unit-papers/
      model-papers/
    accounting/
      notes/
      short-notes/
      past-papers/
      past-paper-answers/
      provincial-papers/
      unit-papers/
      model-papers/
    business-studies/
      notes/
      short-notes/
      past-papers/
      past-paper-answers/
      provincial-papers/
      unit-papers/
      model-papers/
```

## Adding Resources

### Step 1: Upload PDF Files

1. Place your PDF files in the appropriate directory:
   - For Economics notes: `public/resources/economics/notes/`
   - For ICT past papers: `public/resources/ict/past-papers/`
   - And so on...

2. **File Naming Convention** (recommended):
   - Use lowercase with hyphens: `economics-past-paper-2023.pdf`
   - Include subject, type, year, and description
   - Example: `ict-provincial-paper-2023-western.pdf`

### Step 2: Add Resource Entry to `data/resources.json`

Open `data/resources.json` and add a new resource object to the `resources` array.

#### Basic Resource Structure:

```json
{
  "id": "unique-resource-id",
  "subject": "economics",
  "type": "notes",
  "title": "Resource Title",
  "filePath": "/resources/economics/notes/filename.pdf",
  "description": "Optional description"
}
```

#### Resource Types:

- `notes` - Regular notes
- `short-notes` - Short notes/summaries
- `past-papers` - Past examination papers
- `past-paper-answers` - Answer schemes for past papers
- `provincial-papers` - Provincial examination papers
- `unit-papers` - Unit test papers
- `model-papers` - Model papers
- `videos` - External video resources (YouTube or other platforms)

#### Subjects:

- `economics`
- `ict`
- `accounting`
- `business-studies`

#### Complete Examples:

**1. Simple Notes:**
```json
{
  "id": "econ-notes-2024-2",
  "subject": "economics",
  "type": "notes",
  "title": "Market Structures",
  "filePath": "/resources/economics/notes/market-structures.pdf",
  "description": "Detailed notes on different market structures"
}
```

**2. Past Paper with Year:**
```json
{
  "id": "econ-past-paper-2024",
  "subject": "economics",
  "type": "past-papers",
  "year": 2024,
  "title": "Economics Past Paper 2024",
  "filePath": "/resources/economics/past-papers/economics-2024.pdf",
  "hasAnswers": true
}
```

**3. Past Paper Answers (Linked to Question Paper):**
```json
{
  "id": "econ-past-paper-answers-2024",
  "subject": "economics",
  "type": "past-paper-answers",
  "year": 2024,
  "title": "Economics Past Paper Answers 2024",
  "filePath": "/resources/economics/past-paper-answers/economics-answers-2024.pdf",
  "linkedPaperId": "econ-past-paper-2024"
}
```

**4. Provincial Paper (without answers):**
```json
{
  "id": "ict-provincial-paper-2024",
  "subject": "ict",
  "type": "provincial-papers",
  "year": 2024,
  "title": "ICT Provincial Paper 2024",
  "filePath": "/resources/ict/provincial-papers/ict-provincial-2024.pdf",
  "hasAnswers": false
}
```

**5. Provincial Paper (with answers):**
```json
{
  "id": "ict-provincial-paper-2024",
  "subject": "ict",
  "type": "provincial-papers",
  "year": 2024,
  "title": "ICT Provincial Paper 2024",
  "filePath": "/resources/ict/provincial-papers/ict-provincial-2024.pdf",
  "hasAnswers": true
}
```

Then add the answer resource:
```json
{
  "id": "ict-provincial-paper-answers-2024",
  "subject": "ict",
  "type": "provincial-papers",
  "year": 2024,
  "title": "ICT Provincial Paper Answers 2024",
  "filePath": "/resources/ict/provincial-papers/ict-provincial-answers-2024.pdf",
  "linkedPaperId": "ict-provincial-paper-2024"
}
```

**6. Video Resource (YouTube URL):**
```json
{
  "id": "econ-video-elasticity-intro",
  "subject": "economics",
  "type": "videos",
  "title": "Price Elasticity of Demand — Intro",
  "filePath": "",
  "videoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "description": "Short explainer on PED with examples"
}
```

### Adding Video URLs

- Set `type` to `videos`
- Use `videoUrl` with a full URL (YouTube, Vimeo, etc.)
- Leave `filePath` empty (`""`) since videos are external links
- Optional fields like `year`, `lecturer`, and `description` are allowed

UI behavior:
- Cards with `videoUrl` display a "Watch Video" button that opens in a new tab
- Video resources appear under the "Videos" filter and also in "All" when applicable

## Important Notes

### Linking Answers to Papers

- When a paper has `"hasAnswers": true`, clicking "Answers Available" will navigate to the answer resource
- Answer resources must have `"linkedPaperId"` set to the ID of the question paper
- The `linkedPaperId` should match the `id` of the question paper exactly

### ID Format

- Use descriptive, unique IDs: `subject-type-year-description`
- Examples:
  - `econ-past-paper-2023`
  - `ict-unit-paper-2024-1`
  - `accounting-model-paper-2024`

### File Paths

- Always start with `/resources/`
- Use lowercase with hyphens in directory and file names
- Match the actual file location in the `public/` directory

### Year Field

- Include `year` for papers (past-papers, provincial-papers, unit-papers, model-papers)
- Optional for notes and short-notes

### Has Answers Flag

- Set `"hasAnswers": true` on question papers when answers exist
- Set `"hasAnswers": false` when answers don't exist (optional, defaults to false)
- Answer resources themselves don't need this flag

## Quick Checklist

- [ ] PDF file uploaded to correct directory
- [ ] PDF file uploaded to correct directory (skip for videos)
- [ ] Resource entry added to `data/resources.json`
- [ ] Unique ID assigned
- [ ] Correct subject and type selected
- [ ] File path matches actual file location
- [ ] File path matches actual file location (leave empty for videos)
- [ ] For videos, `videoUrl` is a valid, complete URL
- [ ] If it's a paper with answers, set `hasAnswers: true`
- [ ] If it's an answer resource, set `linkedPaperId` to the question paper ID
- [ ] Year included for papers
- [ ] Description added (optional but recommended)

## Testing

After adding resources:

1. Restart the development server: `npm run dev`
2. Navigate to the subject page
3. Check that the resource appears in the correct category
4. Verify the download link works (or Watch Video opens in a new tab for videos)
5. If it's a paper with answers, click "Answers Available" to test navigation

