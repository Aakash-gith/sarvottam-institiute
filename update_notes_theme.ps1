$BASE_DIR = "c:\Users\hp\Desktop\Projects\Sarvottam\sarvottam-institiute\grade10\notes"

$THEMES = @{
    "Physics"   = @{
        "background" = "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)";
        "h1_color"   = "#2c3e50";
        "h2_color"   = "#1a252f";
        "h1_border"  = "#2c3e50";
        "th_bg"      = "#2c3e50"
    };
    "Chemistry" = @{
        "background" = "linear-gradient(120deg, #f6d365 0%, #fda085 100%)";
        "h1_color"   = "#d35400";
        "h2_color"   = "#a04000";
        "h1_border"  = "#d35400";
        "th_bg"      = "#d35400"
    };
    "Biology"   = @{
        "background" = "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)";
        "h1_color"   = "#1b5e20";
        "h2_color"   = "#006400";
        "h1_border"  = "#1b5e20";
        "th_bg"      = "#1b5e20"
    }
}

Get-ChildItem -Path $BASE_DIR -Recurse -Filter "*.html" | ForEach-Object {
    $file = $_
    $subject = $file.Directory.Name
    
    if ($THEMES.ContainsKey($subject)) {
        $theme = $THEMES[$subject]
        $content = Get-Content $file.FullName -Raw
        
        # Replace Body Background
        $content = $content -replace "body\s*\{[^}]*background:[^;]*;", "body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: $($theme['background']);"
        
        # Replace H1 Color and Border
        $content = $content -replace "h1\s*\{[^}]*color:[^;]*;", "h1 { color: $($theme['h1_color']);"
        $content = $content -replace "border-bottom:\s*3px\s*solid\s*[^;]*;", "border-bottom: 3px solid $($theme['h1_border']);"
        
        # Replace H2 Color
        $content = $content -replace "h2\s*\{[^}]*color:[^;]*;", "h2 { color: $($theme['h2_color']);"
        
        # Replace TH Background
        $content = $content -replace "th\s*\{[^}]*background-color:[^;]*;", "th { background-color: $($theme['th_bg']);"
        
        # Replace Inline H3 Color (Key Takeaways)
        $content = $content -replace "color: #667eea", "color: $($theme['h1_color'])"
        
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Updated $($file.Name)"
    }
}
