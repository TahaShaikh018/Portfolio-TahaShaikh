import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY

def build_pdf(filename="c:/Users/mdtah/.gemini/antigravity-ide/scratch/personal-portfolio/public/resume.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=30,
        bottomMargin=30
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#1A365D')
    )
    
    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#2D3748')
    )
    
    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        textColor=colors.HexColor('#1A365D'),
        spaceAfter=2,
        spaceBefore=6
    )
    
    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=11.5,
        textColor=colors.HexColor('#2D3748'),
        alignment=TA_JUSTIFY
    )
    
    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#2D3748'),
        leftIndent=12
    )

    item_header = ParagraphStyle(
        'ItemHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=colors.HexColor('#1A365D')
    )

    item_sub = ParagraphStyle(
        'ItemSub',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#4A5568')
    )

    story = []

    # Name & Contact Header
    story.append(Paragraph("TAHA SHAIKH", name_style))
    story.append(Spacer(1, 3))
    story.append(Paragraph("+91 8010268064 | mdtahask63@gmail.com | Shirdi, Maharashtra, India", contact_style))
    story.append(Paragraph('<a href="https://linkedin.com/in/taha-shaikh-a045b831b" color="#0056b3">linkedin.com/in/taha-shaikh-a045b831b</a> | <a href="https://github.com/TahaShaikh018" color="#0056b3">https://github.com/TahaShaikh018</a>', contact_style))
    story.append(Spacer(1, 4))

    def add_section(title):
        story.append(Paragraph(title.upper(), section_heading))
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#1A365D'), spaceBefore=1, spaceAfter=4))

    # Professional Summary
    add_section("PROFESSIONAL SUMMARY")
    story.append(Paragraph(
        "AI & Data Science undergraduate and published AI researcher with hands-on experience across Machine Learning, Computer Vision, and Generative AI. LLM Post-Training Intern with proven ability to evaluate, optimize, and validate large language model outputs against human-feedback guidelines. Skilled in building end-to-end AI applications and deriving actionable insight through data analytics. Driven to apply cutting-edge AI research to solve real-world problems at scale.",
        body_style
    ))
    story.append(Spacer(1, 4))

    # Education
    add_section("EDUCATION")
    edu_table_data = [
        [Paragraph("<b>B.Tech in Artificial Intelligence & Data Science</b>", item_header), Paragraph("<font color='#4A5568'>2024 – 2028</font>", ParagraphStyle('RightText', parent=item_header, alignment=2))],
        [Paragraph("Sanjivani University", item_sub), Paragraph("", item_sub)],
    ]
    t = Table(edu_table_data, colWidths=[400, 140])
    t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(t)
    story.append(Paragraph("<b>Relevant Coursework:</b> Machine Learning, Artificial Intelligence, Deep Learning, Computer Vision, Natural Language Processing, Database Management Systems, Statistics", bullet_style))
    story.append(Spacer(1, 3))

    edu2_table_data = [
        [Paragraph("<b>Senior Secondary (Science) — Maharashtra State Board</b>", item_header), Paragraph("<font color='#4A5568'>2024</font>", ParagraphStyle('RightText', parent=item_header, alignment=2))],
        [Paragraph("Sai Nirman Junior College | Percentage: 63.67%", item_sub), Paragraph("", item_sub)],
    ]
    t2 = Table(edu2_table_data, colWidths=[400, 140])
    t2.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(t2)
    story.append(Spacer(1, 4))

    # Experience
    add_section("EXPERIENCE")
    exp_table_data = [
        [Paragraph("<b>LLM Post-Training Intern — Ethara AI</b>", item_header), Paragraph("<font color='#4A5568'>Feb 2026 – May 2026</font>", ParagraphStyle('RightText', parent=item_header, alignment=2))],
        [Paragraph("Virtual", item_sub), Paragraph("", item_sub)],
    ]
    t_exp = Table(exp_table_data, colWidths=[400, 140])
    t_exp.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(t_exp)
    story.append(Spacer(1, 2))
    story.append(Paragraph("• Evaluated and validated Large Language Model (LLM) outputs for accuracy, relevance, consistency, and safety in accordance with human feedback guidelines.", bullet_style))
    story.append(Paragraph("• Developed and refined structured datasets through systematic data preparation and annotation to support LLM post-training workflows.", bullet_style))
    story.append(Paragraph("• Optimized model response quality by conducting rigorous prompt evaluation and iterative feedback analysis.", bullet_style))
    story.append(Paragraph("• Collaborated with a distributed remote team to consistently deliver evaluation deliverables ahead of deadlines.", bullet_style))
    story.append(Spacer(1, 4))

    # Technical Skills
    add_section("TECHNICAL SKILLS")
    story.append(Paragraph("<b>Programming:</b> Python, SQL, C++, R", bullet_style))
    story.append(Paragraph("<b>AI / Machine Learning:</b> Machine Learning, Deep Learning, Computer Vision, Natural Language Processing, Large Language Models, Scikit-learn", bullet_style))
    story.append(Paragraph("<b>Data Analytics:</b> Pandas, NumPy, Data Cleaning, Exploratory Data Analysis, Tableau", bullet_style))
    story.append(Paragraph("<b>Libraries:</b> OpenCV, MediaPipe", bullet_style))
    story.append(Paragraph("<b>Tools:</b> Git, GitHub, VS Code, Jupyter Notebook", bullet_style))
    story.append(Spacer(1, 4))

    # Projects
    add_section("PROJECTS")
    story.append(Paragraph("<b>AI Sign Language Interpreter</b>", item_header))
    story.append(Paragraph("Python, OpenCV, MediaPipe, Computer Vision", item_sub))
    story.append(Paragraph("• Developed a real-time sign language interpreter that converts hand gestures into speech and text output.", bullet_style))
    story.append(Paragraph("• Optimized frame-processing pipeline to minimize latency and enable smooth real-time translation.", bullet_style))
    story.append(Paragraph("• Improved accessibility for hearing- and speech-impaired users through computer vision-based gesture recognition.", bullet_style))
    story.append(Spacer(1, 3))

    story.append(Paragraph("<b>AirBlocks – Gesture-Based 3D Modeling System</b>", item_header))
    story.append(Paragraph("Python, OpenCV, MediaPipe", item_sub))
    story.append(Paragraph("• Built a gesture-controlled virtual 3D modeling application, implementing real-time hand tracking to let users create, resize, move, and manipulate virtual blocks.", bullet_style))
    story.append(Paragraph("• Designed a grid-based spatial interaction system to enable precise, intuitive object manipulation without physical hardware.", bullet_style))
    story.append(Paragraph("• Optimized real-time gesture recognition pipeline, reducing latency and improving tracking accuracy.", bullet_style))
    story.append(Spacer(1, 3))

    story.append(Paragraph("<b>MeetMate – AI Meeting Assistant</b>", item_header))
    story.append(Paragraph("Python, NLP", item_sub))
    story.append(Paragraph("• Developed an AI-powered meeting assistant that analyzes user preferences to recommend optimized meeting times.", bullet_style))
    story.append(Paragraph("• Implemented NLP-based recommendation logic to automate scheduling decisions and reduce coordination overhead.", bullet_style))
    story.append(Spacer(1, 4))

    # Research & Publications
    add_section("RESEARCH & PUBLICATIONS")
    story.append(Paragraph("• Co-authored an AI research paper published in JETIR (Journal of Emerging Technologies and Innovative Research).", bullet_style))
    story.append(Paragraph("• Presented research work at TEKCLUSTER'25, a National Level Technical Symposium.", bullet_style))
    story.append(Spacer(1, 4))

    # Certifications
    add_section("CERTIFICATIONS")
    story.append(Paragraph("• Tata Group – GenAI Powered Data Analytics Job Simulation", bullet_style))
    story.append(Paragraph("• Deloitte – Data Analytics Job Simulation", bullet_style))
    story.append(Paragraph("• IBM – Business Intelligence", bullet_style))
    story.append(Paragraph("• IBM – DevOps, Agile & Design Thinking", bullet_style))
    story.append(Paragraph("• MongoDB – MongoDB For Students", bullet_style))
    story.append(Paragraph("• CognitiveClass – SQL and Relational Database 101", bullet_style))

    doc.build(story)
    print("PDF generated successfully at:", filename)

if __name__ == "__main__":
    build_pdf()
