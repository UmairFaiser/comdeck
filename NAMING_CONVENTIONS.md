# File Naming Conventions

This document outlines the naming conventions for organizing and uploading resources to Comdeck.

## Directory Structure

All resources should be placed in the following structure:

```
public/resources/
  [subject]/
    [resource-type]/
      [filename].pdf
```

## Subjects

Use these exact subject folder names (lowercase, with hyphens):
- `economics`
- `ict`
- `accounting`
- `business-studies`

## Resource Types

Use these exact folder names (lowercase, with hyphens):
- `notes` - Regular study notes
- `short-notes` - Condensed notes/summaries
- `past-papers` - Past examination papers
- `past-paper-answers` - Answer schemes for past papers
- `provincial-papers` - Provincial examination papers
- `unit-papers` - Unit test papers
- `model-papers` - Model examination papers

## File Naming Rules

### General Rules:
1. **Use lowercase only** - `economics-past-paper-2023.pdf` ✅ not `Economics-Past-Paper-2023.pdf` ❌
2. **Use hyphens (-) not underscores (_)** - `past-paper-2023.pdf` ✅ not `past_paper_2023.pdf` ❌
3. **No spaces** - `short-notes-unit-1.pdf` ✅ not `short notes unit 1.pdf` ❌
4. **Include year for papers** - Always include the year for past papers, provincial papers, unit papers, and model papers
5. **Be descriptive but concise** - Include enough info to identify the resource

### Naming Patterns by Resource Type:

#### 1. Notes
**Pattern:** `[subject]-notes-[topic].pdf`

**Examples:**
- `economics-notes-market-structures.pdf`
- `ict-notes-database-fundamentals.pdf`
- `accounting-notes-financial-statements.pdf`
- `business-studies-notes-marketing.pdf`

#### 2. Short Notes
**Pattern:** `[subject]-short-notes-[topic].pdf`

**Examples:**
- `economics-short-notes-key-terms.pdf`
- `ict-short-notes-networking.pdf`
- `accounting-short-notes-formulas.pdf`

#### 3. Past Papers
**Pattern:** `[subject]-past-paper-[year].pdf`

**Examples:**
- `economics-past-paper-2023.pdf`
- `ict-past-paper-2024.pdf`
- `accounting-past-paper-2022.pdf`
- `business-studies-past-paper-2023.pdf`

#### 4. Past Paper Answers
**Pattern:** `[subject]-past-paper-answers-[year].pdf`

**Examples:**
- `economics-past-paper-answers-2023.pdf`
- `ict-past-paper-answers-2024.pdf`
- `accounting-past-paper-answers-2022.pdf`

**Important:** The answer file should correspond to the question paper. If the question paper is `economics-past-paper-2023.pdf`, the answer should be `economics-past-paper-answers-2023.pdf`.

#### 5. Provincial Papers
**Pattern:** `[subject]-provincial-paper-[year]-[province].pdf` (if province is known)
**OR:** `[subject]-provincial-paper-[year].pdf` (if province is unknown)

**Examples:**
- `economics-provincial-paper-2023-western.pdf`
- `ict-provincial-paper-2024.pdf`
- `accounting-provincial-paper-2023-central.pdf`

#### 6. Provincial Paper Answers
**Pattern:** `[subject]-provincial-paper-answers-[year]-[province].pdf`
**OR:** `[subject]-provincial-paper-answers-[year].pdf`

**Examples:**
- `economics-provincial-paper-answers-2023-western.pdf`
- `ict-provincial-paper-answers-2024.pdf`

#### 7. Unit Papers
**Pattern:** `[subject]-unit-paper-[unit-number]-[year].pdf`
**OR:** `[subject]-unit-paper-[unit-number].pdf`

**Examples:**
- `economics-unit-paper-1-2024.pdf`
- `ict-unit-paper-2.pdf`
- `accounting-unit-paper-3-2023.pdf`

#### 8. Unit Paper Answers
**Pattern:** `[subject]-unit-paper-answers-[unit-number]-[year].pdf`
**OR:** `[subject]-unit-paper-answers-[unit-number].pdf`

**Examples:**
- `economics-unit-paper-answers-1-2024.pdf`
- `ict-unit-paper-answers-2.pdf`

#### 9. Model Papers
**Pattern:** `[subject]-model-paper-[year].pdf`
**OR:** `[subject]-model-paper-[identifier].pdf`

**Examples:**
- `economics-model-paper-2024.pdf`
- `ict-model-paper-mid-year-2024.pdf`
- `accounting-model-paper-final-2023.pdf`

#### 10. Model Paper Answers
**Pattern:** `[subject]-model-paper-answers-[year].pdf`
**OR:** `[subject]-model-paper-answers-[identifier].pdf`

**Examples:**
- `economics-model-paper-answers-2024.pdf`
- `ict-model-paper-answers-mid-year-2024.pdf`

## Quick Reference Table

| Resource Type | Naming Pattern | Example |
|--------------|---------------|---------|
| Notes | `[subject]-notes-[topic].pdf` | `economics-notes-market-structures.pdf` |
| Short Notes | `[subject]-short-notes-[topic].pdf` | `ict-short-notes-networking.pdf` |
| Past Papers | `[subject]-past-paper-[year].pdf` | `accounting-past-paper-2023.pdf` |
| Past Paper Answers | `[subject]-past-paper-answers-[year].pdf` | `accounting-past-paper-answers-2023.pdf` |
| Provincial Papers | `[subject]-provincial-paper-[year]-[province].pdf` | `economics-provincial-paper-2023-western.pdf` |
| Provincial Answers | `[subject]-provincial-paper-answers-[year]-[province].pdf` | `economics-provincial-paper-answers-2023-western.pdf` |
| Unit Papers | `[subject]-unit-paper-[unit]-[year].pdf` | `ict-unit-paper-1-2024.pdf` |
| Unit Answers | `[subject]-unit-paper-answers-[unit]-[year].pdf` | `ict-unit-paper-answers-1-2024.pdf` |
| Model Papers | `[subject]-model-paper-[year].pdf` | `business-studies-model-paper-2024.pdf` |
| Model Answers | `[subject]-model-paper-answers-[year].pdf` | `business-studies-model-paper-answers-2024.pdf` |

## Common Mistakes to Avoid

❌ **DON'T:**
- Use uppercase: `Economics-Past-Paper-2023.pdf`
- Use underscores: `economics_past_paper_2023.pdf`
- Use spaces: `economics past paper 2023.pdf`
- Skip the year for papers: `economics-past-paper.pdf`
- Use inconsistent naming: `Econ-PP-2023.pdf`

✅ **DO:**
- Use lowercase: `economics-past-paper-2023.pdf`
- Use hyphens: `economics-past-paper-2023.pdf`
- Be consistent: Always follow the same pattern
- Include year: `economics-past-paper-2023.pdf`
- Be descriptive: `economics-past-paper-2023.pdf` not `econ-pp-23.pdf`

## Examples of Complete File Paths

```
public/resources/economics/past-papers/economics-past-paper-2023.pdf
public/resources/economics/past-paper-answers/economics-past-paper-answers-2023.pdf
public/resources/ict/notes/ict-notes-database-fundamentals.pdf
public/resources/accounting/provincial-papers/accounting-provincial-paper-2024-western.pdf
public/resources/business-studies/unit-papers/business-studies-unit-paper-1-2024.pdf
```

## After Uploading Files

Once you've uploaded your PDF files following these conventions, you can:

1. **List your files** - Share the file paths or directory structure with me
2. **I'll generate the JSON** - I'll create the `data/resources.json` entries automatically
3. **Review and adjust** - We can refine titles, descriptions, and linking relationships

## Need Help?

If you're unsure about naming a file, follow this checklist:
- [ ] Is it lowercase?
- [ ] Are spaces replaced with hyphens?
- [ ] Does it follow the pattern for its resource type?
- [ ] Is the year included (for papers)?
- [ ] Is it descriptive enough to identify the resource?

